import { remote } from 'electron';
import Promise from 'es6-promise';

const bankAccounts = remote.getGlobal('db').transactionsQueue;

export default {
  load,
  create,
  store
};

function load () {
  return new Promise((resolve, reject) => {
    bankAccounts.loadDatabase(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function create (bankAccount) {
  return new Promise((resolve, reject) => {
    bankAccounts.insert(bankAccount, (err, newBankAccount) => {
      if (err) {
        reject(err);
      }
      resolve(newBankAccount);
    });
  });
}

function store () {
  return new Promise(resolve => {
    bankAccounts.persistence.compactDatafile();
    resolve();
  });
}
