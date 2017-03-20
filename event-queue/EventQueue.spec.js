/* eslint func-names: 0 */
import { expect } from 'chai';
import EventQueue from './EventQueue';

const mochaAsync = (fn) => async (done) => {
  try {
    await fn();
    done();
  } catch (err) {
    done(err);
  }
};

describe('event queue', () => {
  it('subscribe a event listener to the queue', () => {
    const eq = new EventQueue();
    const FooEvent = () => {
    };
    const callback = eq.subscribe('EventFoo', FooEvent);
    expect(callback).to.be.equal(FooEvent);
    expect(eq._listeners.EventFoo[0]).to.be.equal(FooEvent);
  });

  it('dispatches an event', mochaAsync(async () => {
    const eq = new EventQueue();
    let assertPayload;
    const FooEvent = (payload) => {
      assertPayload = payload;
    };
    const callback = eq.subscribe('EventFoo', FooEvent);
    await eq.dispatch('EventFoo', { foo: 'bar' });
    expect(assertPayload).to.have.property('foo', 'bar');
  }));

  it('dispatches an event and saves it to persistent storage', mochaAsync(async () => {
    const eq = new EventQueue();
    const FooEvent = (payload) => {
    };
    const callback = eq.subscribe('EventFoo', FooEvent);
    eq.dispatch('EventFoo', { foo: 'bar' });
    eq.dispatch('EventFoo', { alpha: 'bravo' });
  }));
});
