import fs from 'fs';
import * as url from 'url';
import express from 'express';
import ip from 'ip';
import { publicIpv4 } from 'public-ip';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// app.use(bodyParser.json());
app.set('trust proxy', true);

const __dirname = url.fileURLToPath(new URL('./IPDB.CSV', import.meta.url));
let jsonData = fs.readFileSync(__dirname, 'utf8').split('\r\n');

function oneEl(data, ip) {
  const arrEl = [];
  // console.log(ip);

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const dataEl = element.replace(/["]/g, '').split(',');
    arrEl.push(dataEl);
    // const ip = strEl.slice(0, 2);
  }

  for (const el of arrEl) {
    let ip1 = Number(el.slice(0, 1));
    let ip2 = Number(el.slice(1, 2));
    let location = el.slice(2, 3);

    if (ip >= ip1 && ip <= ip2) {
      res.send(`<h2>Your location ${location}</h2>`);
    }
  }

  return arrEl;
}

// oneEl(jsonData);

app.get('/', (req, res) => {
  res.send('<h1>Geolocation says Hello</h1>');
});

app.get('/get_ip', (req, res) => {
  // const ipAddress =
  // req.header('x-forwarded-for') || req.socket.remoteAddress || req.ip;

  // const ipAddress = ip.address();

  publicIpv4().then(ip => {
    res.send(`<h2>Your IP ${ip}</h2>`);
  });
});

app.get('/get_location', (req, res) => {
  res.send('<h1></h1>');

  var ip = req.headers['x-forwarded-for'];
  console.log(ip);
  req.remoteAddress;
  req.socket.remoteAddress || req.socket.remoteAddress;

  // let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  // const ipAddress = ip.address();

  // let ipStr = req.headers['x-forwarded-for'];
  // req.remoteAddress;
  // req.socket.remoteAddress || req.socket.remoteAddress;

  // console.log(ipStr);

  // const ipToNum = ipStr.split('.').reduce((a, b) => (a << 8) | b) >>> 0;

  // console.log(ipToNum);

  // oneEl(jsonData, ipToNum);
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});

// app.get('/', (req, res) => {
//   res.send('<h1></h2>');
//   var ip = req.headers['x-forwarded-for'];
//   req.connection.remoteAddress;
//   req.socket.remoteAddress || req.connection.socket.remoteAddress;

//   finding(elements, ip);
// });

// app.get('/', (req, res) => {
//   res.send('<h1></h2>');
//   var ip = req.headers['x-forwarded-for'];
//   console.log(ip);
//   req.remoteAddress;
//   req.socket.remoteAddress || req.socket.remoteAddress;
// });
