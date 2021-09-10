const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'SDC';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
sequelize
  .authenticate()
  .then(() => {
    console.info('Conected to SDC_review database');
  })
  .catch((err) => {
    console.error('ERROR - Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
