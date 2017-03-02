import Datastore from 'nedb';
import { app } from 'electron';
import fs from 'fs';

const dir = app.getPath('userData');
console.log(`initiazing database in: "${dir}"`)

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
