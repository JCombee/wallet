import parse from './../parsers/csv';
import rabobank from './../banks/rabobank/csv-oud';
import transactionsQueue from './../repositories/transactionsQueue';
import bankAccounts from './../repositories/bankAccounts';

export default function (req, res) {
  const { filePath } = req.body;
  res.end();

  transactionsQueue.load().then(() => {
    bankAccounts.load().then(() => {
      parse(filePath, transaction => {
        bankAccounts.updateOrCreate(ownerAccountPipe(transaction))
            .then(ownerAccount => {
              bankAccounts.updateOrCreate(opposingAccountPipe(transaction))
                .then(opposingAccount => {
                  transactionsQueue.create(transactionsQueRecordPipe(transaction, ownerAccount._id, opposingAccount._id));
                });
            });
      }, () => {
        transactionsQueue.store();
        bankAccounts.store();
      });
    });
  });
}

function transactionsQueRecordPipe(transaction, accountId, opposingAccountId) {
  return {
    inputHash: rabobank.inputHash(transaction),
    accountId,
    currency: rabobank.currency(transaction),
    interestDate: rabobank.interestDate(transaction),
    addSubstractCode: rabobank.addSubstractCode(transaction),
    ammount: rabobank.ammount(transaction),
    opposingAccountId,
    bookingDate: rabobank.bookingDate(transaction),
    bookingCode: rabobank.bookingCode(transaction),
    description: rabobank.description(transaction)
  };
}

function ownerAccountPipe(transaction) {
  return {
    iban: rabobank.iban(transaction)
  };
}

function opposingAccountPipe(transaction) {
  return {
    iban: rabobank.opposingIban(transaction),
    name: rabobank.opposingAccountName(transaction)
  };
}
