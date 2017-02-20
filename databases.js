import Datastore from 'nedb';

global.db = {
  transactions: initDb('transactions'),
  bankAccounts: initDb('bankAccounts'),
  transactionsQueue: initDb('transactionsQueue')
};

function initDb(dbName) {
  return new Datastore({ filename: `${getDataDir()}/WhereDidMyMoneyGo/${dbName}` });
}

function getDataDir() {
  if (process.env.APPDATA) {
    return `${process.env.APPDATA}`;
  }
  return process.platform === 'darwin' ? `${process.env.HOME}Library/Preferences` : '/var/local';
}
