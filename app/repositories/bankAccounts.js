import { remote } from 'electron';
import Promise from 'es6-promise';

const bankAccounts = remote.getGlobal('db').bankAccounts;

export default {
  load,
  updateOrCreate,
  store
};

function load() {
  return new Promise((resolve, reject) => {
    bankAccounts.loadDatabase(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function findOne(bankAccount) {
  return new Promise((resolve, reject) => {
    bankAccounts.findOne(bankAccount, (err, newBankAccount) => {
      if (err) {
        return reject(err);
      }
      resolve(newBankAccount);
    });
  });
}

function create(bankAccount) {
  return new Promise((resolve, reject) => {
    bankAccounts.insert(bankAccount, (err, newBankAccount) => {
      if (err) {
        reject(err);
      }
      resolve(newBankAccount);
    });
  });
}

function updateOrCreate(bankAccount) {
  return new Promise((resolve, reject) => {
    findOne({ iban: bankAccount.iban }).then(oldBankAccount => {
      if (!oldBankAccount) {
        return create(bankAccount).then(resolve, reject);
      }
      resolve(oldBankAccount);
    }, reject);
  });
}

function store() {
  return new Promise(resolve => {
    bankAccounts.persistence.compactDatafile();
    resolve();
  });
}
