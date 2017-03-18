import Promise from 'es6-promise';

const transactionsQueue = global.db.transactionsQueue;

export default {
  load,
  create,
  remove,
  all,
  last,
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
    transactionsQueue.insert(transaction, (err, newTransaction) => {
      if (err) {
        return reject(err);
      }
      resolve(newTransaction);
    });
  });
}

function remove (query) {
  return new Promise((resolve, reject) => {
    transactionsQueue.remove(query, (err, numRemoved) => {
      if (err) {
        return reject(err);
      }
      resolve(numRemoved);
    });
  });
}

function all () {
  return new Promise((resolve, reject) => {
    transactionsQueue.find({}, (err, transactions) => {
      if (err) {
        return reject(err);
      }
      resolve(transactions);
    });
  });
}

function last (ammount) {
  return new Promise((resolve, reject) => {
    transactionsQueue.find({}, (err, transactions) => {
      if (err) {
        return reject(err);
      }
      transactions.splice(ammount);
      resolve(transactions);
    });
  });
}

function store () {
  return new Promise(resolve => {
    transactionsQueue.persistence.compactDatafile();
    resolve();
  });
}
