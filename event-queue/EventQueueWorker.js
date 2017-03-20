import Promise from 'es6-promise';

class EventQueueWorker {
  constructor(config) {
    this.config = Object.assign({}, config);
  }

  run() {
    return new Promise((resolve, reject) => {
      this.config.dependencies._repository.next()
      .then(({ event, payload }) => {
        const listeners = this.config.dependencies._eventQueue._listeners[event];
        listeners.forEach(listener => {
          listener(payload);
        });
        return new this.constructor(this.config).run()
         .then(resolve, reject);
      }, reject);
    });
  }
}

export default EventQueueWorker;
