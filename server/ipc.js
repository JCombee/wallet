import { ipcMain } from 'electron'
import GET from './../constants/get'
import submitFileFeature from './features/submitFile'
import getQueueFeature from './features/getQueue'

export default function init () {
  ipcMain.on('submit-file', submitFileFeature);
  ipcMain.on(GET.TRANSACTIONS_QUEUE_REQUEST, getQueueFeature)
}
