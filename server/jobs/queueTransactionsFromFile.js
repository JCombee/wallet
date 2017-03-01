import parse from './../parsers/csv';
import Promise from 'es6-promise'
import rabobank from './../banks/rabobank/csv-oud';
import transactionsQueue from './../repositories/transactionsQueue';
import bankAccountsQueue from '../repositories/bankAccountsQueue';

export default function (filePath) {
  return new Promise((resolve) => {
    transactionsQueue.load().then(() => {
      bankAccountsQueue.load().then(() => {

        parse(filePath, () => {
        }, transaction => {
          bankAccountsQueue.updateOrCreate(ownerAccountPipe(transaction))
            .then(ownerAccount => {
              bankAccountsQueue.updateOrCreate(opposingAccountPipe(transaction))
                .then(opposingAccount => {
                  transactionsQueue.create(transactionsQueRecordPipe(transaction, ownerAccount._id, opposingAccount._id));
                });
            });
        }, () => {
          transactionsQueue.store().then(() => {
            bankAccountsQueue.store().then(() => resolve())
          })
        });
      });transformTransactionQueueObjectToRecords
    });
  })
}

function transactionsQueRecordPipe (transaction) {
  return {
    inputHash: rabobank.inputHash(transaction),
    accountIban: rabobank.iban(transaction),
    currency: rabobank.currency(transaction),
    interestDate: rabobank.interestDate(transaction),
    addSubstractCode: rabobank.addSubstractCode(transaction),
    ammount: rabobank.ammount(transaction),
    opposingAccountIban: rabobank.opposingIban(transaction),
    bookingDate: rabobank.bookingDate(transaction),
    bookingCode: rabobank.bookingCode(transaction),
    description: rabobank.description(transaction)
  };
}

function ownerAccountPipe (transaction) {
  return {
    iban: rabobank.iban(transaction)
  };
}

function opposingAccountPipe (transaction) {
  return {
    iban: rabobank.opposingIban(transaction),
    name: rabobank.opposingAccountName(transaction)
  };
}
