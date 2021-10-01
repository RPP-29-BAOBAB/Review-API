const mysql = require('mysql');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'SDC_review',
  password: '123456789'
});

db.connect(function (err) {
  if (err) { throw err; }
  console.log('Connected!');
  db.query('USE SDC_review', (err, result) => {
    console.log('Using SDC Review Database');
  });

  const photos = `LOAD DATA LOCAL INFILE './csv/reviews_photos.csv' INTO TABLE photos 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"' 
  LINES TERMINATED BY '\n' 
  IGNORE 1 ROWS `;

  const reviews = `LOAD DATA LOCAL INFILE './csv/reviews.csv' INTO TABLE reviews 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"' 
  LINES TERMINATED BY '\n' 
  IGNORE 1 ROWS `;

  const characteristics = `LOAD DATA LOCAL INFILE './csv/characteristics.csv' INTO TABLE characteristics 
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"' 
  LINES TERMINATED BY '\n' 
  IGNORE 1 ROWS `;

  const charReviews = `LOAD DATA LOCAL INFILE './csv/characteristic_reviews.csv' INTO TABLE char_reviews
  FIELDS TERMINATED BY ',' 
  ENCLOSED BY '"' 
  LINES TERMINATED BY '\n' 
  IGNORE 1 ROWS `;

  db.query(reviews, (err, result) => {
    if (err) { throw err; }
    console.log('Migrate reviews data success');
  });

  db.query(photos, (err, result) => {
    if (err) { throw err; }
    console.log('Migrate photos data success');
  });

  db.query(characteristics, (err, result) => {
    if (err) { throw err; }
    console.log('Migrate characteristics data success');
  });

  db.query(charReviews, (err, result) => {
    if (err) { throw err; }
    console.log('Migrate characteristics reviews data success');
  });

});

























// const fs = require('fs')
// const csv = require('csv-parser')
// const { Reviews, Reviewers, Photos } = require('../db')

// const dropDB = async () => {
//   await Reviewers.drop();
//   await Reviewers.sync();
//   await Reviews.drop();
//   await Reviews.sync();
//   //loadDB();
// }



// const loadDB = () => {
//   fs.createReadStream('./csv/reviews.csv')
//     .pipe(csv())
//     .on('data', async function (row) {

// console.log(':::::::::::::::::::::::', row)

/* load reviews and reviewers */

// const name = row.reviewer_name;
// const email = row.reviewer_email;
// let reviewer_id;
// const findReviewer = await Reviewers.findAll({
//   where: { name: name, email: email }
// })
// if (findReviewer.length === 0) {
//   const reviewers = await Reviewers.create({
//     name: row.reviewer_name,
//     email: row.reviewer_email
//   })
//   reviewer_id = reviewers.id
// } else {
//   reviewer_id = findReviewer[0].id
// }

// const review = await Reviews.create({
//   id: row.id,
//   product_id: row.product_id,
//   rating: row.rating,
//   date: new Date(Number(row.date)).toJSON(),
//   summary: row.summary,
//   body: row.body,
//   recommend: row.recommend,
//   reported: row.reported,
//   response: row.response,
//   helpfulness: row.helpfulness,
//   // reviewer: reviewer_id
// })
//   .catch(err => console.log(err))
//console.log('>>>>>>>>>>>>>>>>>>>>>>>>>', review)
//     })
// }
// Photos.drop();
// Photos.sync();
// fs.createReadStream('./csv/reviews_photos.csv')
//   .pipe(csv())
//   .on('data', async function (row) {
//     //console.log('>>>>>>>>>>>>>>>>>>>>', row)

//     const photo = await Photos.create({
//       review_id: row.review_id,
//       url: row.url
//     })
//       .catch(err => console.log(err))
//     //console.log('>>>>>>>>>>>>>>>>>>>', photo)
//   });