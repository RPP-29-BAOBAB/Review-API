const request = require('supertest');
const server = require('../server.js');

let listen;
beforeEach(() => {
  listen = server.listen(6000, () => {
    console.log('Review API listening at http://localhost: 6000');
  });
});

afterEach(() => {
  listen.close();
});


describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });
});

describe('Test server API request', () => {
  test('Should response GET reviews ', (done) => {
    request(server)
      .get('/reviews?product_id=10')
      .expect(200)
      .then(res => {
        done();
      })
      .catch(err => done(err));
  });

  // test('Should able to post review', (done) => {
  //   request(server)
  //     .post('/reviews')
  //     .expect(201)
  //     .then(res => {
  //       done();
  //     });
  // });

  test('Should able to GET meta data', (done) => {
    request(server)
      .get('/reviews/meta?product_id=10')
      .expect(200)
      .then(res => {
        done();
      });
  });

  test('Should able to add helpful ', (done) => {
    request(server)
      .put('/reviews/1/helpful')
      .expect(204)
      .then(res => {
        done();
      });
  });

  test('Should able to report ', (done) => {
    request(server)
      .put('/reviews/1/report')
      .expect(204)
      .then(res => {
        done();
      });
  });
});

