import fs from 'fs'
import Promise from 'es6-promise'
import csv from 'fast-csv'
import transactionsQueue from './../repositories/transactionsQueue'
import bankAccounts from './../repositories/bankAccounts'

const timeoutTime = 0

export function submitFile (file) {
  return () => {
    const stream = fs.createReadStream(file.path)
    transactionsQueue.load()
    bankAccounts.load()

    const array = []
    const csvStream = csv()
      .on('data', (data) => {
        array.push(parseTransaction(data))
      })
      .on('end', () => {
        forEach(array)
        function forEach (collection) {
          if (collection.length === 0) {
            console.log('done')
            transactionsQueue.store()
            bankAccounts.store()
            return
          }
          const transaction = collection.pop()
          bankAccounts.updateOrCreate(transaction.bankAccount)
            .then(bankAccount => {
              bankAccount.updateOrCreate(transaction.oposingBankAccount)
                .then(oposingBankAccount => {
                  transactionsQueue.create(Object.assign({}, transaction, {
                    bankAccount: bankAccount._id,
                    oposingBankAccount: oposingBankAccount._id
                  }), () => {
                    forEach(collection)
                  })
                })
              return transaction
            })
        }
      })

    stream.pipe(csvStream)
  }
}

function parseTransaction (transaction) {
  return {
    bankAccount: { iban: transaction[ 0 ] },
    currency: transaction[ 1 ],
    interestDate: new Date(`${transaction[ 2 ].slice(0, 4)} ${transaction[ 2 ].slice(4, 6)} ${transaction[ 2 ].slice(6, 8)}`),
    add: transaction[ 3 ] === 'D',
    ammount: parseFloat(transaction[ 4 ]),
    oposingBankAccount: {
      iban: transaction[ 5 ],
      owner: transaction[ 6 ]
    },
    bookingDate: new Date(`${transaction[ 7 ].slice(0, 4)} ${transaction[ 7 ].slice(4, 6)} ${transaction[ 7 ].slice(6, 8)}`),
    bookingCode: transaction[ 8 ],
    description: transaction[ 10 ] + transaction[ 11 ] + transaction[ 12 ] +
    transaction[ 13 ] + transaction[ 14 ] + transaction[ 15 ],
    sepaEndToEndId: transaction[ 16 ],
    sepaOposingBankAccountId: transaction[ 17 ],
    sepaMandateId: transaction[ 18 ]
  }
}
