const db = require('../models/index.js')
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Reviews = sequelize.define('reviews', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  product_id: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  date: Sequelize.STRING,
  summary: Sequelize.STRING,
  body: Sequelize.TEXT,
  recommend: Sequelize.STRING(10),
  reported: Sequelize.STRING(10),
  reviewer_name: Sequelize.INTEGER,
  reviewer_email: Sequelize.INTEGER,
  response: Sequelize.TEXT,
  helpfulness: Sequelize.INTEGER
});

const Reviewers = sequelize.define('reviewers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

const Photos = sequelize.define('photos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  review_id: Sequelize.INTEGER,
  url: Sequelize.STRING
});

const Characteristics = sequelize.define('characteristics', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_id: Sequelize.INTEGER,
  name: Sequelize.CHAR(20)
})

const Char_reviews = sequelize.define('char_reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  char_id: Sequelize.INTEGER,
  review_id: Sequelize.INTEGER,
  value: Sequelize.INTEGER
});

const tests = sequelize.define('tests', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  product_id: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  date: Sequelize.STRING,
  summary: Sequelize.STRING,
  body: Sequelize.TEXT,
  recommend: Sequelize.BOOLEAN,
  reported: Sequelize.BOOLEAN,
  response: Sequelize.TEXT,
  helpfulness: Sequelize.INTEGER,
  reviewer: Sequelize.INTEGER
});

Reviews.sync();
Reviewers.sync();
Photos.sync();
Char_reviews.sync();
Characteristics.sync();
tests.sync();

exports.Reviews = Reviews;
exports.Reviewers = Reviewers;
exports.Photos = Photos;
exports.Characteristics = Characteristics;
exports.Char_reviews = Char_reviews;
exports.tests = tests;