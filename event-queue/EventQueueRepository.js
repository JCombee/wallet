import Datastore from 'nedb';
import Promise from 'es6-promise';
import { createReadWriteLock } from 'locks';

class EventQueueRepository {
  constructor(config) {
    this.config = Object.assign({
      dependencies: {
        _database: new Datastore(),
        _Promise: Promise,
        _rwlock: createReadWriteLock()
      }
    }, config);
  }

  insert(event, payload) {
    const { _Promise, _rwlock, _database } = this.config.dependencies;
    return new _Promise((resolve, reject) => {
      _rwlock.writeLock(() => {
        _database.insert({ event, payload }, (err, record) => {
          if (err) {
            return reject();
          }
          _rwlock.unlock();
          resolve(record);
        });
      });
    });
  }

  next() {
    const { _Promise, _rwlock, _database } = this.config.dependencies;
    return new _Promise((resolve, reject) => {
      _rwlock.readLock(() => {
        _database.find({}, (err, records) => {
          if (err) {
            return reject();
          }
          const record = Object.assign({}, records[0]);
          _rwlock.unlock();
          resolve(record);
        });
      });
    });
  }

}

export default EventQueueRepository;
