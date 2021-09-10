const { Reviews, Reviewers, Photos, Characteristics, Char_reviews } = require('../models/db.js');


const getPhotos = async (reviewId, callback) => {
  await Photos.findAll({
    where: { review_id: reviewId },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'review_id']
    }
  })
    .then((photos) => {
      callback(photos);
    });
};

const sort = () => {

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
      for (let i = 0; i < count; i++) {
        const review = reviewsData[i];
        const reviewId = review.review_id;
        await getPhotos(reviewId, (photos) => {
          review.photos = photos;
          responseReviews.results.push(review);
        });
      }
      res(responseReviews);
    });
};

exports.getReviews = getReviews;
