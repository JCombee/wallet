export default function () {
  global.mainWindow.ipcRenderer.send('get-transactions-queue', transactionsQueue)
}
