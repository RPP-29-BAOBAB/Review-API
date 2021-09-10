const express = require('express');
const router = require('./router');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Review API');
});

app.get('/favicon.ico', (req, res) => {
  res.send('A');
});

app.all('*', (req, res) => {
  router(req, (data) => {
    console.log('GET reviews data success');
    res.json(data);
    res.end();
  });
 
});


app.listen(port, () => {
  console.log(`Review API listening at http://localhost:${port}`);
});