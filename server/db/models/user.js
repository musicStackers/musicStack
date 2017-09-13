const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  address: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function correctPassword(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

/**
 * classMethods
 */
User.generateSalt = (() =>
  crypto.randomBytes(16).toString('base64')
);

User.encryptPassword = ((plainText, salt) =>
  crypto.createHash('sha1').update(plainText).update(salt).digest('hex')
);

/**
 * hooks
 */
const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    const tmpUser = user;
    tmpUser.salt = User.generateSalt();
    tmpUser.password = User.encryptPassword(user.password, user.salt);
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
