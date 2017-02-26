import parse from './../parsers/csv'
import rabobank from './../banks/rabobank/csv-oud'
import transactionsQueue from './../repositories/transactionsQueue'
import bankAccounts from './../repositories/bankAccounts'

const timeoutTime = 0

export function submitFile (file) {
  return () => {
    transactionsQueue.load()
    bankAccounts.load()

    parse(file, transaction => {
      transactionsQueue.create(transactionsQueRecord(transaction))
    }, () => {
      transactionsQueue.store()
    })
  }
}

function transactionsQueRecord (transaction) {
  return {
    account: rabobank.account(transaction),
    currency: rabobank.currency(transaction),
    ammoun: rabobank.currency(transaction)
  }
}
