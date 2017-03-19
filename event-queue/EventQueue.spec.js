/* eslint func-names: 0 */
import { expect } from 'chai';
import EventQueue from './EventQueue';

describe('event queue', () => {
  it('subscribe a event listener to the queue', () => {
    const eq = new EventQueue();
    const FooEvent = () => {
    };
    const callback = eq.subscribe('EventFoo', FooEvent);
    expect(callback).to.be.equal(FooEvent);
    expect(eq._listeners.EventFoo[0]).to.be.equal(FooEvent);
  });

  it('dispatches an event', () => {
    const eq = new EventQueue();
    const FooEvent = (payload) => {
      expect(payload.foo).to.be.equal('bar');
    };
    const callback = eq.subscribe('EventFoo', FooEvent);
    eq.dispatch('EventFoo', { foo: 'bar' });
  });

  it('dispatches an event and saves it to persistent storage', () => {
    const eq = new EventQueue();
    const FooEvent = (payload) => {
    };
    const callback = eq.subscribe('EventFoo', FooEvent);
    eq.dispatch('EventFoo', { foo: 'bar' });
    eq.dispatch('EventFoo', { alpha: 'bravo' });
  });
});
