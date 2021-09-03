const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Review API');
});


app.listen(port, () => {
  console.log(`Review API listening at http://localhost:${port}`);
});