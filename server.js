const express = require('express');
const router = require('./router');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Review API');
});

app.get('/reviews', (req, res) => {
  router.getReviews(req, (data) => {
    res.status(200);
    res.json(data);
  });
});

app.get('/reviews/meta', (req, res) => {
  router.getMeta(req, (data) => {
    res.status(200);
    res.json(data);
  });
});

app.post('/reviews', (req, res) => {
  router.postReview(req, () => {
    res.status(201);
    res.end();
  });
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  router.putHelpful(req, () => {
    console.log('add helpful success');
    res.status(204);
    res.end();
  });
});

app.put('/reviews/:review_id/report', (req, res) => {
  router.putReport(req, () => {
    console.log('reported');
    res.status(204);
    res.end();
  });
});

module.exports = app;