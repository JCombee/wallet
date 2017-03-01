import transactionsQueueRepository from './../repositories/transactionsQueue'
import transactionsRepository from './../repositories/transactions'
import bankAccountsRepository from './../repositories/bankAccounts'
import Promise from 'es6-promise'

export default function () {
  console.log(1)
  return new Promise((resolve) => {
    console.log(2)
    transactionsQueueRepository.load().then(() => {
      transactionsRepository.load().then(() => {
        bankAccountsRepository.load().then(() => {
          transactionsQueueRepository.all().then(transactions => {
            console.log(3)
            function forEachTransaction (transactionsQueued, i = 0) {
              const transaction = transactionsQueued[ i ]
              console.log(4)
              if (!transaction) {
                console.log(555)
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
                  console.log(111)
                  return forEachTransaction(transactionsQueued, i + 1)
                }
                console.log(222)
                transactionsQueueRepository.remove({ _id: transaction._id }).then(() => {
                  transformTransactionQueueObjectToRecords(transaction).then(transaction => {
                    transactionsRepository.create(transaction)
                      .then(() => {
                        return forEachTransaction(transactionsQueued, i + 1)
                      }, (err) => console.log('error 4!', err))
                  }, (err) => console.log('error 3!', err))
                }, (err) => console.log('error 2!', err))
              }, (err) => console.log('error 1!', err))
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
