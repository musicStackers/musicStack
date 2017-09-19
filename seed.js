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
    { photoURL: 'https://images.reverb.com/image/upload/s--SPkOTfWn--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1476392876/iubpftbnjpfyhko2gkoi.png' },
    { photoURL: 'https://images.reverb.com/image/upload/s--sQXo5U2W--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1476392872/gdih1cl4ncyorjccc9ec.png' },
    { photoURL: 'https://images.reverb.com/image/upload/s--R1e_P_wL--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1476392883/kdseiogfj88beyoxhejb.png' },
  ],
  [
    { photoURL:
      'https://images.reverb.com/image/upload/s--cpm9SLGh--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_1600,q_80,w_1600/v1481127499/t2krag8o2perhk1gs97l.png' },
    { photoURL:
      'https://images.reverb.com/image/upload/s--C5m455l4--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1481127502/eyehs3vdreoyvnydrila.png' },
    { photoURL:
      'https://images.reverb.com/image/upload/s--8cEZGL5H--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1481127510/cbkcvcpmnvwzorf6wywa.png' },
  ],
  [
    { photoURL:
      'https://images.reverb.com/image/upload/s--lq5CQIyn--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1475077223/yt5v3wetnbqyq8mhdtkr.jpg' },
    { photoURL:
      'https://images.reverb.com/image/upload/s--ndL3RXJI--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1505845941/bkw4juxascyhwgw8pjea.jpg' },
  ],
];

const keyboardPhotos = [
  [
    { photoURL: 'http://www.fairdealmusic.co.uk/media/catalog/product/cache/1/image/1ad2536b4e0b64b5213084f52c752e7f/c/t/ctk-7200-keyboard_4.jpg' },
    { photoURL: 'https://images.reverb.com/image/upload/s---Yk-qzep--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1505844111/wowzacfhlyzuirw6owck.jpg' },
    { photoURL: 'https://images.reverb.com/image/upload/s--MhBlXf76--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1504551432/bd9d5kp5os1uzwza6yyb.jpg' },
  ],
];

const drumPhotos = [
  [
    { photoURL: 'https://images.reverb.com/image/upload/s--G7uBhUYR--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1481913167/yni6uincxbdpr94qipu9.jpg' },
    { photoURL: 'https://images.reverb.com/image/upload/s--Bs8eedMH--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1500657446/ajg8lgdhyrs5ze0havuz.jpg' },
    { photoURL: 'https://images.reverb.com/image/upload/s--qUTgyfX9--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1505829569/ved35ydgidwfwi8b8ytc.jpg' },
  ],
];

const bassPhotos = [
  [
    { photoURL: 'https://images.reverb.com/image/upload/s--mqJ8FMNf--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1505794815/kzljmtynwlhvly8avox8.jpg' },
    { photoURL: 'https://images.reverb.com/image/upload/s--UxpUfHGt--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1481134081/jjhktyjvlrtuscwiq8ar.png' },
    { photoURL: 'https://images.reverb.com/image/upload/s--YSsXNQJv--/a_exif,c_limit,e_unsharp_mask:80,f_auto,fl_progressive,g_south,h_620,q_90,w_620/v1479511675/csgyuijgyvxe7qcs2aob.jpg' },
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
