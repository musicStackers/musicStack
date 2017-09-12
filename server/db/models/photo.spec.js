/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');

const Photo = db.model('photo');

describe('Photo model', () => {
  beforeEach(() => db.sync({ force: true }));

  let productPhoto;

  beforeEach(() => {
    productPhoto = Photo.build({
      photoURL: 'http://placekitten.com/200/300',
    });
  });

  it('includes a url', () =>
    productPhoto.save()
      .then(savedPhoto =>
        expect(savedPhoto.photoURL).to.equal('http://placekitten.com/200/300'),
      ),
  );

  it('requires a url', () => {
    productPhoto.photoURL = null;

    return productPhoto.validate()
      .then(() => {
        throw new Error('validation should fail when photoURL is empty');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
        expect(result.message).to.contain('Validation error');
      });
  });
});

