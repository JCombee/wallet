/* eslint func-names: 0 */
import { expect } from 'chai';
import EventQueueRepository from './EventQueueRepository';

const mochaAsync = (fn) => async (done) => {
  try {
    await fn();
    done();
  } catch (err) {
    done(err);
  }
};

describe('event queue repository', () => {
  it('runs a happy flow', mochaAsync(async () => {
    const eq = new EventQueueRepository();

    await eq.insert('RedEvent', { green: 'Blue' });

    const assertRecord = await eq.next();

    expect(assertRecord).to.have.property('event', 'RedEvent');
    expect(assertRecord).to.have.deep.property('payload.green', 'Blue');
  }));

  describe('insert', () => {
    it('persits a dispatched event', mochaAsync(async () => {
      const eq = new EventQueueRepository();

      await eq.insert('FooEvent', { foo: 'bar' });

      const assertRecord = await new Promise((resolve1) => {
        eq.config.dependencies._database.find({}, (r, a) => resolve1(a));
      });

      expect(assertRecord).to.be.a('array');
      expect(assertRecord).to.have.length(1);
      expect(assertRecord[0]).to.have.property('event', 'FooEvent');
      expect(assertRecord[0]).to.have.deep.property('payload.foo', 'bar');
    }));
  });

  describe('next', () => {
    it('retrives the next best event', mochaAsync(async () => {
      const eq = new EventQueueRepository();

      await new Promise((resolve) => {
        const insertRecord = { event: 'AlphaEvent', payload: { bravo: 'Charlie' } };
        eq.config.dependencies._database.insert(insertRecord, () => resolve());
      });

      const assertRecord = await eq.next();
      expect(assertRecord).to.have.property('event', 'AlphaEvent');
      expect(assertRecord).to.have.deep.property('payload.bravo', 'Charlie');
    }));
  });
});
