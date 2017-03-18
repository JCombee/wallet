import { ipcRenderer } from 'electron'
import GET from './../constants/get'
import { TRANSACTIONS_QUEUE_ACTIONS } from './constants/transactions'

export default function ({ dispatch }) {
  ipcRenderer.on(GET.TRANSACTIONS_QUEUE_RECEIVE, (e, transactions) => {
    dispatch({ type: TRANSACTIONS_QUEUE_ACTIONS.RECEIVE, payload: transactions })
  })
}
