/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Review = require('./review');

describe('Review model', () => {
  beforeEach(() => db.sync({ force: true }));

  let testReview;

  beforeEach(() => {
    testReview = Review.build({
      description: 'this is great guitar!!!',
      star: 4,
    });
  });

  it('includes a description and star', () =>
    testReview.save()
      .then((savedReview) => {
        expect(savedReview.description).to.equal('this is great guitar!!!');
        expect(savedReview.star).to.equal(4);
      }),
  );

  it('has description that has more than 5 characters or fewer than 1000 characters', () => {
    testReview.description = 'abc';

    return testReview.validate()
      .then(() => {
        throw new Error('validation should fail when description doesnt have proper length');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('review in more than 5 characters or fewer than 1000 characters');
      });
  });

  it('has star value less than or equal to 5', () => {
    testReview.star = 7;

    return testReview.validate()
      .then(() => {
        throw new Error('validation should fail when star is greater than 5');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation max on star failed');
      });
  });

  it('has star value greater than equal to 0', () => {
    testReview.star = -1;

    return testReview.validate()
      .then(() => {
        throw new Error('validation should fail when star is less than 0');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation min on star failed');
      });
  });
});
