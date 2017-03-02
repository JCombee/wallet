import transactionsQueueRepository from './../repositories/transactionsQueue'
import transactionsRepository from './../repositories/transactions'
import bankAccountsRepository from './../repositories/bankAccounts'
import Promise from 'es6-promise'

export default function () {
  return new Promise((resolve) => {
    transactionsQueueRepository.load().then(() => {
      transactionsRepository.load().then(() => {
        bankAccountsRepository.load().then(() => {
          transactionsQueueRepository.all().then(transactions => {
            function forEachTransaction (transactionsQueued, i = 0) {
              const transaction = transactionsQueued[ i ]
              if (!transaction) {
                transactionsRepository.store()
                transactionsQueueRepository.store()
                return resolve()
              }

              const query = {
                currency: transaction.currency,
                addSubstractCode: transaction.addSubstractCode,
                interestDate: transaction.interestDate,
                ammount: transaction.ammount,
                bookingDate: transaction.bookingDate,
                bookingCode: transaction.bookingCode,
                description: transaction.description
              }

              transactionsRepository.find(query).then((transactions) => {
                if (transactions.length !== 0) {
                  return forEachTransaction(transactionsQueued, i + 1)
                }
                transactionsQueueRepository.remove({ _id: transaction._id }).then(() => {
                  transformTransactionQueueObjectToRecords(transaction).then(transaction => {
                    transactionsRepository.create(transaction)
                      .then(() => {
                        return forEachTransaction(transactionsQueued, i + 1)
                      }, (err) => console.error('error!', err))
                  }, (err) => console.error('error!', err))
                }, (err) => console.error('error!', err))
              }, (err) => console.error('error!', err))
            }

            forEachTransaction(transactions)
          })
        })
      })
    })
  })
}

function transformTransactionQueueObjectToRecords (transaction) {
  return new Promise((resolve, reject) => {
    bankAccountsRepository.findOne({ iban: transaction.accountIban })
      .then(bankAccount => {
        bankAccountsRepository.findOne({ iban: transaction.opposingAccountIban })
          .then(opposingBankAccount => {
            resolve({
              inputHash: transaction.inputHash,
              accountId: bankAccount._id,
              currency: transaction.currency,
              interestDate: transaction.interestDate,
              addSubstractCode: transaction.addSubstractCode,
              ammount: transaction.ammount,
              opposingAccountId: opposingBankAccount._id,
              bookingDate: transaction.bookingDate,
              bookingCode: transaction.bookingCode,
              description: transaction.description
            })
          }, reject)
      }, reject)
  })
}
