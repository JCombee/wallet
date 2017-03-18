import GET from './../../constants/get'
import transactionsQueue from './../repositories/transactionsQueue'

export default function () {
  transactionsQueue.last(10).then((transactions) => {
    global.mainWindow.send(GET.TRANSACTIONS_QUEUE_RECEIVE, transactions)
  })
}
