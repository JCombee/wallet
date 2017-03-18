import EventQueueRepository from './EventQueueRepository'

class EventQueue {
  constructor () {
    this._listeners = {};
    this._repository = new EventQueueRepository();
  }

  subscribe (key, callback) {
    if (this._listeners[ key ]) {
      this._listeners[ key ].append(callback);
      return callback;
    }
    this._listeners[ key ] = [ callback ];
    return callback;
  }

  dispatch (key, payload) {
    if (this._listeners[ key ]) {
      // this._listeners[ key ].forEach(callback => callback(payload));
      this._repository.insert(key, payload);
      return
    }
    console.warn(`There are no listeners for "${key}"`);
  }
}

export default EventQueue
