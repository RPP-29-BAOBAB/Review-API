const express = require('express');
const router = require('./router');
const app = express();


app.get('/', (req, res) => {
  res.send('Review API');
});

app.get('/reviews', (req, res) => {
  router.getReviews(req, (data) => {
    res.json(data);
  });
});

app.get('/reviews/meta', (req, res) => {
  res.status(200);
  res.end();
});

app.post('/reviews', (req, res) => {
  res.status(201);
  res.end();
});

app.put('/reviews/:product_id/helpful', (req, res) => {
  res.status(204);
  res.end();
});

app.put('/reviews/:product_id/report', (req, res) => {
  res.status(204);
  res.end();
});

module.exports = app;