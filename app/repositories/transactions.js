import { remote } from 'electron';
import Promise from 'es6-promise';
import { hashObjectByAttr } from './../utils/hash';

const transactions = remote.getGlobal('db').transactions;

export default {
  load,
  updateOrCreate,
  store
};

function load () {
  return new Promise((resolve, reject) => {
    transactions.loadDatabase(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function findOne (transactions) {
  return new Promise((resolve, reject) => {
    transactions.findOne(transactions, (err, newTransactions) => {
      if (err) {
        return reject(err);
      }
      resolve(newTransactions);
    });
  });
}

function create (transaction) {
  transaction.hash = hashObjectByAttr(transaction)
  return new Promise((resolve, reject) => {
    transaction.insert(transaction, (err, newTransactions) => {
      if (err) {
        reject(err);
      }
      resolve(newTransactions);
    });
  });
}

function updateOrCreate (transaction) {
  transaction.hash = hashObjectByAttr(transaction)
  return new Promise((resolve, reject) => {
    findOne({ hash: transaction.hash }).then(oldTransactions => {
      if (!oldTransactions) {
        return create(transaction).then(resolve, reject);
      }
      resolve(oldTransactions);
    }, reject);
  });
}

function store () {
  return new Promise(resolve => {
    transactions.persistence.compactDatafile();
    resolve();
  });
}
