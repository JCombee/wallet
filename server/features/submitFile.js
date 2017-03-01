import queueTransactionsFromFile from './../jobs/queueTransactionsFromFile'
import checkQueuedBankAccounts from './../jobs/checkQueuedBankAccounts'
import insertTransactionIfUnique from './../jobs/insertTransactionIfUnique'

export default function (filePath) {
  console.log('start feature', filePath)
  queueTransactionsFromFile(filePath).then(() => {
    checkQueuedBankAccounts().then(() => {
      insertTransactionIfUnique().then(() => console.log('end feature'))
    })
  })
}