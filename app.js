const app = require('./server.js');

const server = app.listen(5000, () => {
  console.log('Review API listening at http://localhost: 6000');
});

module.exports = server;