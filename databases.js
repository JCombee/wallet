import Datastore from 'nedb';
import fs from 'fs';

const dir = `${getDataDir()}/WhereDidMyMoneyGo`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

global.db = {
  transactions: initDb('transactions'),
  bankAccounts: initDb('bankAccounts'),
  bankAccountsQueue: initDb('bankAccountsQueue'),
  transactionsQueue: initDb('transactionsQueue')
};

function initDb (dbName) {
  return new Datastore({ filename: `${dir}/${dbName}` });
}

function getDataDir () {
  if (fs.existsSync(process.env)) {
    return `${process.env.APPDATA}`;
  }
  return process.platform === 'darwin' ? `${process.env.HOME}Library/Preferences` : process.env.HOME;
}
