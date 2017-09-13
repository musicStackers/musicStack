/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Order = require('./order');

describe('Order model', () => {
  beforeEach(() => db.sync({ force: true }));

  let testOrder;

  beforeEach(() => {
    testOrder = Order.build({
      email: 'music@music.music',
      address: '100 Enterprise Dr, Chicago, IL 600654',
    });
  });

  it('status is defaulted to created', () =>
    testOrder.save()
      .then((savedOrder) => {
        expect(savedOrder.status).to.equal('created');
      }),
  );

  it('cannot set invalid status', () => {
    testOrder.status = 'fake status';

    return testOrder.save()
      .then(() => {
        throw new Error('validation should fail when invalid status is set');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('invalid input value for enum');
      });
  });

  it('includes an email and address', () =>
    testOrder.save()
      .then((savedOrder) => {
        expect(savedOrder.email).to.equal('music@music.music');
        expect(savedOrder.address).to.equal('100 Enterprise Dr, Chicago, IL 600654');
      }),
  );

  it('requires an email', () => {
    testOrder.email = null;

    return testOrder.validate()
      .then(() => {
        throw new Error('validation should fail when status is empty');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('notNull Violation');
      });
  });

  it('requires an address', () => {
    testOrder.address = null;

    return testOrder.validate()
      .then(() => {
        throw new Error('validation should fail when address is empty');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('notNull Violation');
      });
  });
});
