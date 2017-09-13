/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');

const User = db.model('user');

describe('User model', () => {
  beforeEach(() => db.sync({ force: true }));

  describe('model definition', () => {
    let testUser;

    beforeEach(() =>
      User.create({
        email: 'test@test.test',
        password: 'test',
      })
        .then((user) => {
          testUser = user;
        }),
    );

    it('includes a correct email', () => {
      expect(testUser.email).to.be.equal('test@test.test');
    });

    it('requires an email', () => {
      testUser.email = null;

      return testUser.validate()
        .then(() => {
          throw new Error('validation should fail when email is empty');
        },
        (result) => {
          expect(result).to.be.an.instanceOf(Error);
          expect(result.message).to.contain('notNull Violation');
        });
    });
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody = {};

      beforeEach(() =>
        User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
        })
          .then((user) => {
            cody = user;
          }),
      );

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });
    });
  });
});
