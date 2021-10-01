const db = require('./index.js');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Reviews = sequelize.define('reviews', {
  review_id: { type: Sequelize.INTEGER, primaryKey: true },
  product_id: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  date: Sequelize.STRING,
  summary: Sequelize.STRING,
  body: Sequelize.TEXT,
  recommend: Sequelize.STRING(10),
  reported: Sequelize.STRING(10),
  reviewer_name: Sequelize.STRING,
  reviewer_email: Sequelize.STRING,
  response: Sequelize.TEXT,
  helpfulness: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
},
// {indexes: [{name: 'product_id_index', unique: 'false', fields: ['product_id']}]}
);

const Photos = sequelize.define('photos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  review_id: Sequelize.INTEGER,
  url: Sequelize.STRING
},
// {indexes: [{name: 'review_id_index', unique: 'false', fields: ['review_id']}]}
);

const Characteristics = sequelize.define('characteristics', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_id: Sequelize.INTEGER,
  name: Sequelize.CHAR(20)
});

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

exports.Reviews = Reviews;
exports.Photos = Photos;
exports.Characteristics = Characteristics;
exports.Char_reviews = Char_reviews;
