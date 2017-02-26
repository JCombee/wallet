import { remote } from 'electron';
import Promise from 'es6-promise';

const transactionsQueue = remote.getGlobal('db').transactionsQueue;

export default {
  load,
  create,
  store
};

function load () {
  return new Promise((resolve, reject) => {
    transactionsQueue.loadDatabase(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function create (transaction) {
  return new Promise((resolve, reject) => {
    console.log(1)
    transactionsQueue.insert(transaction, (err, newTransaction) => {
      console.log(2, err, newTransaction)
      if (err) {
        return reject(err);
      }
      resolve(newTransaction);
    });
  });
}

function store () {
  return new Promise(resolve => {
    transactionsQueue.persistence.compactDatafile();
    resolve();
  });
}
