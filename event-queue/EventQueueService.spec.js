/* eslint func-names: 0 */
import { expect } from 'chai';
import EventQueueService from './EventQueueService';
import EventQueue from './EventQueue';

describe('event queue service', () => {
  it('instantiates a new instance', () => {
    const eq = EventQueueService.createEventQueue();
    expect(eq instanceof EventQueue).to.be.true;
  });
});
