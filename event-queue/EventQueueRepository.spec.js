/* eslint func-names: 0 */
import { expect } from 'chai';
import EventQueueRepository from './EventQueueRepository';

describe('event queue repository', () => {
  it('persits a dispatched event', () => {
    const eq = new EventQueueRepository();

    let i = 0;
    eq._Promise = function (callback) {
      callback(() => {
        expect(i++).to.be.equal(2)
      });
    };

    let assertRecord;
    eq._Datastore = {
      insert: (record, callback)=> {
        assertRecord = record;
        expect(i++).to.be.equal(0)
        callback(null, record);
      }
    };

    eq._rwlock = {
      writeLock: (callback) => {
        callback(eq._rwlock);
      },
      unlock: () => {
        expect(i++).to.be.equal(1)
      }
    };

    expect(assertRecord.foo).to.be.equals
    eq.insert('FooEvent', { foo: 'bar' });
    // expect(assertRecord).to.be.equal() // equals to the emmited event {event;'FooEvent', payload: {foo:'bar'}
  });
});
