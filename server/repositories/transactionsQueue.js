import Promise from 'es6-promise';

const transactionsQueue = global.db.transactionsQueue;

export default {
  load,
  create,
  store
};

function load() {
  return new Promise((resolve, reject) => {
    transactionsQueue.loadDatabase(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function create(transaction) {
  return new Promise((resolve, reject) => {
    transactionsQueue.insert(transaction, (err, newTransaction) => {
      if (err) {
        return reject(err);
      }
      resolve(newTransaction);
    });
  });
}

function store() {
  return new Promise(resolve => {
    transactionsQueue.persistence.compactDatafile();
    resolve();
  });
}
