/* eslint func-names: 0 */
import { expect } from 'chai';
import EventQueueWorker from './EventQueueWorker';

const mochaAsync = (fn) => async (done) => {
  try {
    await fn();
    done();
  } catch (err) {
    done(err);
  }
};

describe('event queue worker', () => {
  it('runs a event fetched from the repository', mochaAsync(async () => {
    let assertEvent;
    const eqw = new EventQueueWorker({
      dependencies: {
        _repository: {
          next: () => new Promise((resolve) => {
            resolve({ event: 'FooBar', payload: { foo: 'bar' } });
          })
        },
        _eventQueue: { _listeners: { FooBar: [(event) => {
          assertEvent = event;
        }] } }
      }
    });
    await eqw.run();

    expect(assertEvent).to.be.a('object');
    expect(assertEvent).to.be.true;
  }));
});
