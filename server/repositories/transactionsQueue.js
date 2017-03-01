import Promise from 'es6-promise';

const transactionsQueue = global.db.transactionsQueue;

export default {
  load,
  create,
  remove,
  all,
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
  console.log(31)
  return new Promise((resolve, reject) => {
    console.log(32)
    transactionsQueue.remove(query, (err, numRemoved) => {
      console.log(33)
      if (err) {
        console.log(34)
        return reject(err);
      }
      console.log(35)
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

function store () {
  return new Promise(resolve => {
    transactionsQueue.persistence.compactDatafile();
    resolve();
  });
}
