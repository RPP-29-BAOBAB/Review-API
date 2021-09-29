import { check } from 'k6';
import http from 'k6/http';

// export let options = {
//   stages: [
//     {duration: '5s', target: 300},
//     {duration: '1m', target: 300}
//   ]
// };

export let options = {
  vus: 1000,
  duration: '30s',
};

const getRandomId = () => {
  return Math.floor(Math.random() * (1000000 - 900000) + 900000);
};

// const getRandomAPI = () => {
//   const id = getRandomId();
//   const API = [`reviews?product_id=${id}`, `/reviews/meta?product_id=${id}`];
//   return API[1];
// };

export default function() {
  //const randomAPI = getRandomAPI();
  const id = getRandomId();
  let res = http.get(`http://localhost:5000/reviews?product_id=${id}`);
  check(res, {
    'status 200': (r) => r.status === 200
  });
}