const { Reviews, Reviewers, Photos, Characteristics, Char_reviews } = require('../db');

module.exports = router = (req, res) => {
  console.log('>>>>>>>>>>>>>>', req.method, req.url, req.query);
  const productId = req.query.product_id;
  const count = req.query.count;

  const getReviews = async (id, callback) => {
    await Reviews.findAll({
      where: { product_id: id },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      inclue: [{ model: Photos }]
    })
      .then(async (reviewsData) => {
        for (const review of reviewsData) {
          const date = new Date(Number(review.date)).toJSON();
          review.date = date;
          const review_id = review.id;
          await Photos.findAll({
            where: { review_id: review_id },
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          })
            .then((photos) => { review.photos = photos; });
        }

        callback(reviewsData);
      });
  };


  if (req.url = '/reviews') {
    let resData = {
      product: productId,
      count: count || 5,
      results: []
    };

    getReviews(req.query.product_id, (results) => {
      resData.results = results;
      res(resData);
    });
  }

};