import EventQueueRepository from './EventQueueRepository';
import EventQueueWorker from './EventQueueWorker';
import Promise from 'es6-promise';

class EventQueue {
  constructor() {
    this._listeners = {};
    this._repository = new EventQueueRepository();
    this.workerIsRunning = false;
  }

  subscribe(key, callback) {
    if (this._listeners[key]) {
      this._listeners[key].append(callback);
      return callback;
    }
    this._listeners[key] = [callback];
    return callback;
  }

  dispatch(key, payload) {
    return new Promise((resolve, reject) => {
      this._repository.insert(key, payload)
        .then(() => {
          this.worker();
          resolve();
        }, reject);
    });
  }

  worker() {
    if (!this._worker) {
      this._worker = new EventQueueWorker({
        dependencies: {
          _repository: this._repository
        }
      });
    }
    // this._worker = new Promise((resolve) => {
    //   this._repository.next()
    //     .then(({ event, payload }) => {
    //       const listeners = this._listeners[event];
    //       if (listeners) {
    //         listeners.forEach((listener) => { listener(payload); });
    //       }
    //     }, () => {
    //       this._worker = undefined;
    //       resolve();
    //     });
    // });

    return this._worker;
  }
}

export default EventQueue;
