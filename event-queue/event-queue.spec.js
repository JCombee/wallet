/* eslint func-names: 0 */
import { expect } from 'chai';
import { createEventQueue } from './index';

describe('event queue', () => {
  it('queues tasks and executes them in the correct order', () => {
    const eq = createEventQueue();

    eq.subscribe('event', (payload) => {
      expect(payload.foo).to.be.text('bar');
    });

    eq.dispatcher('event', { foo: 'bar' });
  });
});
