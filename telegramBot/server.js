import express from 'express';
import cors from 'cors';
const app = express();

// app.use(
//   cors({
//     origin: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
//     methods: ['GET', 'POST', 'PUT'],
//   }),
// );

// app.put(
//   'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
//   (req, res) => {
//     return res.json(data);
//   },
// );

// const headers = {
//   'Access-Control-Allow-Origin':
//     'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
//   'Access-Control-Allow-Methods': 'GET',
//   'Access-Control-Allow-Headers':
//     'Content-Type, Authorization, X-Requested-With',
// };

app.get(
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
  (req, res) => {
    res.send(data);
  },
);

app.use(
  cors({
    origin: '*',
  }),
);

app.listen(3000);
