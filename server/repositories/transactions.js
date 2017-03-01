import Promise from 'es6-promise';

const transactions = global.db.transactions;

export default {
  load,
  find,
  create,
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

function find (query) {
  console.log(41)
  return new Promise((resolve, reject) => {
    console.log(42)
    transactions.find(query, (err, newTransactions) => {
      console.log(43)
      if (err) {
        console.log(44)
        return reject(err);
      }
      console.log(45)
      resolve(newTransactions);
    });
  });
}

function create (transaction) {
  return new Promise((resolve, reject) => {
    transactions.insert(transaction, (err, newTransactions) => {
      if (err) {
        reject(err);
      }
      resolve(newTransactions);
    });
  });
}

function store () {
  return new Promise(resolve => {
    transactions.persistence.compactDatafile();
    resolve();
  });
}
