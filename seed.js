const chance = require('chance')(123);
const faker = require('faker');
const Promise = require('bluebird');

const db = require('./server/db');
const { User, Product, Photo, Category,
  Order, Review } = require('./server/db/models/');

/* -----------  Set up User data ----------- */

const numUsers = 10;
const userEmails = chance.unique(chance.email, numUsers);

const adminUser = () => {
  const street = chance.address();
  const city = chance.city();
  const state = chance.state();
  const zip = chance.zip();

  return User.create({
    email: 'admin@admin.admin',
    password: '123',
    address: `${street}, ${city}, ${state} ${zip}`,
    isAdmin: true,
  })
    .catch(err => console.error(err));
}

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
  const promiseArr = [adminUser()];
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
];

const createCategories = (() => (
  Promise.all(categories.map(category => (
    Category.create(category)
  )))
));

/* -----------  Set up Photo data ----------- */

// TODO: add more images if you have free time!
const guitarPhotos = [
  [
    { photoURL: 'https://www.taylorguitars.com/sites/default/files/styles/multi_column_guitar_three/public/responsive-guitar-detail/Taylor-524ce-fr-2016.png?itok=ENjzoiOl' },
    { photoURL: 'http://jamestownarts.com/wp-content/uploads/2017/03/maxresdefault.jpg' },
    { photoURL: 'https://i.pinimg.com/736x/24/ea/ff/24eaff9ac0e141a80437de1e3be78b6e--bass-guitars-acoustic-guitars.jpg' },
  ],
  [
    { photoURL:
      'https://s3-us-west-2.amazonaws.com/static.music-man.com/website/images/instruments/instrument-20.png?1467907743' },
    { photoURL:
      'http://www.guitarworld.com/sites/default/files/public/2016/06/BBPOP621.jpg' },
    { photoURL:
      'http://www.guitarworld.com/sites/default/files/public/2016/08/SteveVaiGuitars_4796.jpg' },
  ],
  [
    { photoURL:
      'https://www.taylorguitars.com/sites/default/files/styles/multi_column_guitar_three/public/responsive-guitar-detail/Taylor-814ce-fr-2015.png?itok=B3YG3tBf' },
    { photoURL:
      'http://media.guitarcenter.com/is/image/MMGS7/FA-135CE-Cutaway-Concert-Acoustic-Electric-Guitar-Natural/H70301000001000-00-500x500.jpg' },
  ],
];

const keyboardPhotos = [
  [
    { photoURL: 'http://www.fairdealmusic.co.uk/media/catalog/product/cache/1/image/1ad2536b4e0b64b5213084f52c752e7f/c/t/ctk-7200-keyboard_4.jpg' },
    { photoURL: 'http://musicappblog.com/wp-content/uploads/2013/07/alesis-Q25-keyboard-promo-shot.jpg' },
    { photoURL: 'https://images-na.ssl-images-amazon.com/images/G/01/img16/musical-instruments/vertical-store/keyboards/mi_vertical_keyboards_short_2._CB278962455_.jpg' },
  ],
];

const drumPhotos = [
  [
    { photoURL: 'http://thehub.musiciansfriend.com/images/drumsbuying/yamaha-stage-custom-drum-kit.jpg' },
    { photoURL: 'https://media.sweetwater.com/api/i/ha-e7809fd91e0cc213__q-85__hmac-52a964bbf2ca74645de6a1f9a246b0c2b656b2a7/images/items/1800/LJR5PCWR-xlarge.jpg' },
    { photoURL: 'https://i.ytimg.com/vi/CYNnqKA1AKo/maxresdefault.jpg' },
  ],
];

const bassPhotos = [
  [
    { photoURL: 'http://www.deanguitars.com/images/productimages/e5fmtbks/e5fmtbks.png' },
    { photoURL: 'http://www.deanguitars.com/images/productimages/e2vn/e2vn.png' },
    { photoURL: 'https://i.ytimg.com/vi/9N1MPe383Bk/maxresdefault.jpg' },
  ],
];

const bassoonPhotos = [
  [
    { photoURL: 'https://az58332.vo.msecnd.net/e88dd2e9fff747f090c792316c22131c/Images/Products1247-1200x1200-89950.jpg' },
    { photoURL: 'https://static1.squarespace.com/static/53bf2b1ce4b0369fa55d0caf/t/5646ab60e4b0ac3d5288fbba/1447472208643/Bassoon' },
  ],
];

const allPhotos = {
  Guitar: guitarPhotos,
  Keyboard: keyboardPhotos,
  Drum: drumPhotos,
  Bass: bassPhotos,
  Bassoon: bassoonPhotos,
};

/* -----------  Set up Product data ----------- */

const numProducts = 10; // 10 instruments per category

const randomProduct = (category) => {
  let title = faker.commerce.productName();

  // this is to replace last word with category name
  const titleArr = title.split(' ');
  titleArr.pop();
  titleArr.push(category.title);
  title = titleArr.join(' ');

  return Product.create({
    title,
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
  })
    .then(product => (
      Promise.all([product, category.addProduct(product)])
    ))
    .spread((product) => {
      const photoIndex = chance.natural({
        min: 0,
        max: allPhotos[category.title].length - 1,
      });
      const photoDataArr = allPhotos[category.title][photoIndex];
      const photosPromArr = photoDataArr.map(photoData => (
        Photo.create(photoData)
      ));
      return Promise.all([product, Promise.all(photosPromArr)]);
    })
    .spread((product, photos) => {
      const addPhotoPromArr = photos.map(photo => product.addPhoto(photo));
      return Promise.all(addPhotoPromArr);
    })
    .catch(err => console.error(err));
};

const createProductsForCat = (category) => {
  const promiseArr = [];
  for (let i = 0; i < numProducts; i += 1) {
    promiseArr.push(randomProduct(category));
  }
  return Promise.all(promiseArr);
};

/* -----------  Set up Order data ----------- */

const randomOrder = ((user, products) => (
  Order.create({
    email: user.email,
    address: user.address,
  })
    .then(order => (
      Promise.all([order, user.addOrder(order)])
    ))
    .spread(order =>
      Promise.all(products.map((product) => {
        const quantity = Math.ceil(Math.random() * 5);
        return order.addProduct(product, { through:
          { price: product.price, quantity } });
      }))
    )
    .catch(err => console.error(err))
));

const createOrders = (user, products) => {
  const promiseArr = [];
  const numOrders = Math.ceil(Math.random() * 5);
  for (let i = 0; i < numOrders; i += 1) {
    promiseArr.push(randomOrder(user, products));
  }
  return Promise.all(promiseArr);
};

/* -----------  Set up Review data ----------- */

const randomReview = ((user, product) => (
  Review.create({
    description: faker.lorem.paragraph(),
    star: Math.floor(Math.random() * 6),
  })
    .then(review => (
      Promise.all([review, user.addReview(review)])
    ))
    .spread(review => product.addReview(review))
    .catch(err => console.error(err))
));

const createReviews = (user, product) => {
  const promiseArr = [];
  const numReviews = Math.floor(Math.random() * 4);
  for (let i = 0; i < numReviews; i += 1) {
    promiseArr.push(randomReview(user, product));
  }
  return Promise.all(promiseArr);
};

/* -----------  Syncing database ----------- */

const seed = (() => (
  createCategories()
    .then((cats) => {
      const productPromiseArr = cats.map(category => (
        createProductsForCat(category)
      ));
      return Promise.all(productPromiseArr);
    })
    .then((...products) => {
      // products format (need to flatten couple times):
      // [
      //   [cat1 products...
      //     [ prod, prod, ... ] -> assigned to photo 1 of cat 1
      //     [ prod, ... ]
      //   ],
      //   [cat2 products...
      //     ...
      //   ],
      //   ...
      // ]
      let flatProducts = [].concat(...products);
      flatProducts = [].concat(...flatProducts);
      flatProducts = [].concat(...flatProducts);
      return Promise.all([createUsers(), flatProducts]);
    })
    .spread((users, products) => {
      let numOrderProducts;
      let orderProducts;
      const orderPromArr = [];
      users.forEach((user) => {
        // pick random set of products
        numOrderProducts = Math.ceil(Math.random() * 3);
        orderProducts = chance.pickset(products, numOrderProducts);
        orderPromArr.push(createOrders(user, orderProducts));
      });
      return Promise.all([users, products, Promise.all(orderPromArr)]);
    })
    .spread((users, products) => {
      let randomUserIndex;
      let randomReviewUser;
      const reviewPromArr = [];
      products.forEach((product) => {
        // pick random user
        randomUserIndex = Math.floor(Math.random() * users.length);
        randomReviewUser = users[randomUserIndex];

        reviewPromArr.push(createReviews(randomReviewUser, product));
      });
      return Promise.all(reviewPromArr);
    })
    .catch(err => console.log(err))
));

console.log('Syncing database campusmanager ...');

db.sync({ force: true })
  .then(() => {
    console.log('Seeding database campusmanager ...');
    return seed();
  })
  .then(() => {
    console.log('Seeding successful!');
  })
  .catch((err) => {
    console.log('Error from seeding!', err);
  })
  .then(() => {
    db.close();
    return null;
  });
