const chance = require('chance')(123);
const faker = require('faker');

const db = require('./server/db');
const { User, Product, Photo, Category, CategoryProduct} = require('./server/db/models/');

/* -----------  Set up User data ----------- */

const numUsers = 10;
const userEmails = chance.unique(chance.email, numUsers);

const randomUser = () => {
  const street = chance.address();
  const city = chance.city();
  const state = chance.state();
  const zip = chance.zip();

  return User.create({
    email: userEmails.pop(),
    password: chance.string(),
    address: `${street}, ${city}, ${state} ${zip}`,
  })
    .catch(err => console.error(err));
};

const createUsers = () => {
  const promiseArr = [];
  for (let i = 0; i < numUsers; i += 1) {
    promiseArr.push(randomUser());
  }
  return Promise.all(promiseArr);
};

/* -----------  Set up Category data ----------- */

const categories = [
  { title: 'Guitar' },
  { title: 'Keyboard' },
  { title: 'Drum' },
  { title: 'Bass' },
  { title: 'Bassoon' },
  { title: 'Violin' },
  { title: 'Ukulele' },
  { title: 'Trumpet' },
  { title: 'Cello' },
  { title: 'Bagpipe' },
];

const createCategories = (() => (
  Promise.all(categories.map(category => (
    Category.create(category)
  )))
));

/* -----------  Set up Product data ----------- */

const numProducts = 10; // 10 instruments per category

const randomProduct = (catTitle) => {
  let title = faker.commerce.productName();

  // this is to replace last word with category name
  const titleArr = title.split(' ');
  titleArr.pop();
  titleArr.push(catTitle);
  title = titleArr.join(' ');

  return Product.create({
    title,
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
  })
    .catch(err => console.error(err));
};

const createProducts = (catTitle) => {
  const promiseArr = [];
  for (let i = 0; i < numProducts; i += 1) {
    promiseArr.push(randomProduct(catTitle));
  }
  return Promise.all(promiseArr);
};

/* -----------  Syncing database ----------- */
const seed = (() => (
  createCategories()
    .then((cats) => {
      const promiseArr = cats.map(category => createProducts(category.title));
      return Promise.all(promiseArr);
    })
    .then(() => createUsers())
    .catch(err => console.log(err))
));

console.log('Syncing database campusmanager ...');

db.sync({ force: true })
  .then(() => {
    console.log('Seeding database campusmanager ...');
    return seed();
  })
  .catch((err) => {
    console.log('Error from seeding!', err);
  })
  .then(() => {
    console.log('Seeding successful!');
    db.close();
    return null;
  });
