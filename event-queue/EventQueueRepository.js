import Datastore from 'nedb';
import Promise from 'es6-promise';
import { createReadWriteLock } from 'locks';

class EventQueueRepository {
  constructor (config) {
    this._Datastore = new Datastore(config);
    this._Promise = Promise;
    this._rwlock = createReadWriteLock();
  }

  insert (event, payload) {
    return new this._Promise((resolve, reject) => {
      return this._rwlock.writeLock((rwlock) => {
        this._Datastore.insert({ event, payload }, (err, record) => {
          if (err) {
            return reject();
          }
          rwlock.unlock();
          resolve(record);
        });
      });
    });
  }

}

export default EventQueueRepository
