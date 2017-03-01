import Promise from 'es6-promise';

const bankAccountsQueue = global.db.bankAccountsQueue;

export default {
  load,
  all,
  updateOrCreate,
  remove,
  store
};

function load () {
  return new Promise((resolve, reject) => {
    bankAccountsQueue.loadDatabase(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function all () {
  return new Promise((resolve, reject) => {
    bankAccountsQueue.find({}, (err, bankAccounts) => {
      if (err) {
        return reject(err);
      }
      resolve(bankAccounts);
    });
  });
}

function findOne (bankAccount) {
  return new Promise((resolve, reject) => {
    bankAccountsQueue.findOne(bankAccount, (err, newBankAccount) => {
      if (err) {
        return reject(err);
      }
      resolve(newBankAccount);
    });
  });
}

function create (bankAccount) {
  return new Promise((resolve, reject) => {
    bankAccountsQueue.insert(bankAccount, (err, newBankAccount) => {
      if (err) {
        reject(err);
      }
      resolve(newBankAccount);
    });
  });
}

function updateOrCreate (bankAccount) {
  return new Promise((resolve, reject) => {
    findOne({ iban: bankAccount.iban }).then(oldBankAccount => {
      if (!oldBankAccount) {
        return create(bankAccount).then(resolve, reject);
      }
      resolve(oldBankAccount);
    }, reject);
  });
}

function remove (query) {
  return new Promise((resolve, reject) => {
    bankAccountsQueue.remove(query, (err, numRemoved) => {
      if (err) {
        reject(err);
      }
      resolve(numRemoved);
    });
  });
}

function store () {
  return new Promise(resolve => {
    bankAccountsQueue.persistence.compactDatafile();
    resolve();
  });
}
