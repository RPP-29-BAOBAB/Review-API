const { Reviews, Photos, Characteristics, Char_reviews } = require('../models/db.js');

const reviewsCache = {};


const getPhotos = async (reviewId, callback) => {
  await Photos.findAll({
    where: { review_id: reviewId },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'review_id']
    }
  })
    .then((photos) => {
      callback(photos);
    })
    .catch(err => console.log(err));
};

const getReviews = (req, res) => {
  const { product_id, page, count, sort } = req.query;
  let responseReviews = {
    product: product_id,
    page: page || 1,
    count: count || 5,
    results: []
  };
  Reviews.findAll({
    where: { product_id: product_id },
    attributes: { exclude: ['createdAt', 'updatedAt', 'product_id', 'reviewer_email'] }
  })
    .then(async (reviewsData) => {
      for (let i = 0; i < reviewsData.length; i++) {
        const review = reviewsData[i];
        const reviewId = review.review_id;
        review.date = new Date(Number(review.date));
        review.response = review.response === 'null' ? null : review.response;
        await getPhotos(reviewId, (photos) => {
          review.photos = photos;
          responseReviews.results.push(review);
        });
        // if (responseReviews.results.length === count) {
        //   return;
        // }
      }
      reviewsCache[product_id] = responseReviews.results;
      res(responseReviews);
    })
    .catch(err => console.log(err));



};

const getMeta = async (req, res) => {
  const productId = req.query.product_id;
  const resMeta = {
    product_id: productId,
    ratings: {},
    recommended: {},
    characteristics: {}
  };
  // eslint-disable-next-line one-var
  let rating = {}, recommend = {}, characteristics = {};
  await Reviews.findAll({
    where: { product_id: productId },
    attributes: ['rating', 'recommend']
  })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        const rate = data[i].rating;
        const recom = data[i].recommend;
        rating[rate] ? rating[rate]++ : rating[rate] = 1;
        recommend[recom] ? recommend[recom]++ : recommend[recom] = 1;
      }
      resMeta.ratings = rating;
      resMeta.recommended = recommend;
    })
    .catch((err) => console.log(err));

  await Characteristics.findAll({
    where: { product_id: productId },
    attributes: ['id', 'name']
  })
    .then(async data => {
      for (const each of data) {
        characteristics[each.name] = { id: each.id };
        const id = each.id;
        await Char_reviews.findAll({
          where: { char_id: id },
          attributes: ['value']
        })
          .then(allValue => {
            let average = 0;
            let sum = 0;
            for (const eachValue of allValue) {
              sum += eachValue.value;
            }
            average = (sum / allValue.length).toFixed(1);
            characteristics[each.name].value = average;

          })
          .catch(err => console.log(err));
      }
      resMeta.characteristics = characteristics;
    })
    .catch(err => console.log(err));
  console.log('meta', resMeta);
  res(resMeta);
};

const putHelpful = (req, done) => {
  const reviewId = req.params.review_id;
  Reviews.increment('helpfulness', { by: 1, where: { review_id: reviewId } });
  done();
};

const putReport = (req, done) => {
  const reviewId = req.params.review_id;
  let status;
  Reviews.findOne({
    where: { review_id: reviewId },
    attributes: ['reported']
  })
    .then(() => {
      Reviews.update(
        { reported: 'true' },
        { where: { review_id: reviewId } }
      )
        .then(() => done());
    });
};


const getValueChar = (charName, rateChar) => {
  const rate = {
    Size: {
      1: 'A size too small',
      2: '1/2a size too small',
      three: 'Perfect',
      four: '1/2a size too big',
      five: 'A size too wide'
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide'
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'OK',
      4: 'Comfortable',
      5: 'Perfect'
    },
    Quality: {
      1: 'Poor',
      2: 'Bellow average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect'
    },
    Length: {
      1: 'Runs short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    },
  };
  const obj = rate[charName];
  let result;
  for (const key in obj) {
    if (obj[key] === rateChar) {
      return result = key;
    }
  }
  return result;
};

const getCharName = (id, allName) => {
  for (const element of allName) {
    if (element.id === Number(id)) {
      return element.name;
    }
  }
};

const postReview = async (req, res) => {
  const { product_id, rating, summary, body, photos, recommend, name, email, characteristics } = req.body;
  const date = new Date().getTime();
  let reviewId;
  let allCharName;
  await Characteristics.findAll({
    where: { product_id: product_id },
    attributes: ['id', 'name']
  })
    .then(result => {
      allCharName = result;
    });

  await Reviews.create({
    product_id,
    rating,
    date,
    summary,
    body,
    recommend,
    reviewer_name: name,
    reviewer_email: email,
    photos,
    response: null,
    reported: 'false',
    helpfulness: 0
  })
    .then(async result => {
      const data = result.get({ plain: true });
      reviewId = data.review_id;
      for (const key in characteristics) {
        const charName = getCharName(key, allCharName);
        const value = getValueChar(charName, characteristics[key]);
        await Char_reviews.create({
          char_id: key,
          value: value,
          review_id: reviewId
        })
          .then(data => console.log(data.get({ plain: true }), result));
      }
    });

  res();
};

exports.postReview = postReview;
exports.putReport = putReport;
exports.putHelpful = putHelpful;
exports.getMeta = getMeta;
exports.getReviews = getReviews;
