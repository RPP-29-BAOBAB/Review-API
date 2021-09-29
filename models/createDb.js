const {Reviews, Photos, Char_reviews, Characteristics} = require('./db.js');

Reviews.sync();
Photos.sync();
Char_reviews.sync();
Characteristics.sync();