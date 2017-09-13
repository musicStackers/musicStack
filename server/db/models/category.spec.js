/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Category = require('./category');

describe('Category model', () => {
  beforeEach(() => db.sync({ force: true }));

  let testCategory;

  beforeEach(() => {
    testCategory = Category.build({
      title: 'guitars',
    });
  });

  it('includes a title', () =>
    testCategory.save()
      .then((savedCategory) => {
        expect(savedCategory.title).to.equal('guitars');
      }),
  );

  it('requires an title', () => {
    testCategory.title = null;

    return testCategory.validate()
      .then(() => {
        throw new Error('validation should fail when title is empty');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('notNull Violation');
      });
  });
});
