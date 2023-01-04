import fs from 'fs';
import * as url from 'url';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.json());

const __dirname = url.fileURLToPath(new URL('./IPDB.CSV', import.meta.url));
let jsonData = fs.readFileSync(__dirname, 'utf8').split('\r\n');
// console.log(jsonData);

function oneEl(data) {
  let ipArr = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];

    const strEl = element.replace(/["]/g, '').split(',');
    const ip = strEl.slice(0, 2);
    ipArr.push(Number(...ip));
  }
  return ipArr;
}

oneEl(jsonData);

app.get('/', (req, res) => {
  res.send('<h1>Geolocation says Hello</h1>');
});

app.get('/get_ip', (req, res) => {
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
  res.send(`<h2>Your IP ${ipAddress}</h2>`);
});

app.get('/get_location', (req, res) => {});

// app.get('/', (req, res) => {
//   const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
//   res.send(ipAddress);
// });

// app.get('/', (req, res) => {
//   res.send('<h1></h2>');
//   var ip = req.headers['x-forwarded-for'];
//   req.connection.remoteAddress;
//   req.socket.remoteAddress || req.connection.socket.remoteAddress;

//   finding(elements, ip);
// });

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
