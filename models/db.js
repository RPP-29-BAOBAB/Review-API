const db = require('./index.js');
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Reviews = sequelize.define('reviews', {
  review_id: { type: Sequelize.INTEGER, primaryKey: true },
  product_id: Sequelize.INTEGER,
  rating: Sequelize.INTEGER,
  date: Sequelize.STRING(15),
  summary: Sequelize.STRING,
  body: Sequelize.TEXT,
  recommend: Sequelize.STRING(5),
  reported: Sequelize.STRING(5),
  reviewer_name: Sequelize.STRING(30),
  reviewer_email: Sequelize.STRING(50),
  response: Sequelize.TEXT,
  helpfulness: Sequelize.INTEGER,
},
{timestamps: false},
{indexes: [{name: 'product_id_index', unique: 'false', fields: ['product_id']}]}
);

const Photos = sequelize.define('photos', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  review_id: Sequelize.INTEGER,
  url: Sequelize.STRING,
},
{timestamps: false},
{indexes: [{name: 'review_id_index', unique: 'false', fields: ['review_id']}]}
);

const Characteristics = sequelize.define('characteristics', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  product_id: Sequelize.INTEGER,
  name: Sequelize.CHAR(20),
}, 
{timestamps: false}
);

const Char_reviews = sequelize.define('char_reviews', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  char_id: Sequelize.INTEGER,
  review_id: Sequelize.INTEGER,
  value: Sequelize.INTEGER,
},
{timestamps: false},
{indexes: [{name: 'char_review_index', unique: 'false', fields: ['char_id']}]}
);

exports.Reviews = Reviews;
exports.Photos = Photos;
exports.Characteristics = Characteristics;
exports.Char_reviews = Char_reviews;
