/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Product = require('./product');

describe('Product model', () => {
  beforeEach(() => db.sync({ force: true }));

  let testProduct;

  beforeEach(() => {
    testProduct = Product.build({
      title: 'Test Guitar',
      description: 'Guitar created fro testing only!',
      price: 150.99,
    });
  });

  it('includes a title and description', () =>
    testProduct.save()
      .then((savedProduct) => {
        expect(savedProduct.title).to.equal('Test Guitar');
        expect(savedProduct.description).to.equal('Guitar created fro testing only!');
      }),
  );

  it('gets a price in correct format', () =>
    testProduct.save()
      .then((savedProduct) => {
        expect(savedProduct.price).to.equal(150.99);
      }),
  );

  it('updates a price correctly', () =>
    testProduct.save()
      .then(savedProduct => (
        savedProduct.update({ price: 99.99 })
      ))
      .then((updatedProduct) => {
        expect(updatedProduct.price).to.equal(99.99);
      }),
  );

  it('is available flag is defaulted to true', () =>
    testProduct.save()
      .then((savedProduct) => {
        expect(savedProduct.isAvailable).to.equal(true);
      }),
  );

  it('requires a title', () => {
    testProduct.title = null;

    return testProduct.validate()
      .then(() => {
        throw new Error('validation should fail when product title is empty');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('notNull Violation');
      });
  });
});
