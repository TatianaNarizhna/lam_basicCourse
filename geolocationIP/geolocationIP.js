import fs from 'fs';
import * as url from 'url';
import express from 'express';
import ip from 'ip';
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

// app.get('/', (req, res) => {
//   res.send('<h1></h2>');
//   var ip = req.headers['x-forwarded-for'];
//   console.log(ip);
//   req.remoteAddress;
//   req.socket.remoteAddress || req.socket.remoteAddress;
// });

app.get('/', (req, res) => {
  res.send('<h1>Geolocation says Hello</h1>');
});

// app.get('/get_ip', (req, res) => {
//   let ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
//   res.send(`<h2>Your IP ${ipAddress}</h2>`);
// })

app.get('/get_ip', (req, res) => {
  // const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  // const ipAddress =
  // req.header('x-forwarded-for') || req.socket.remoteAddress || req.ip;

  const ipAddress = ip.address();
  res.send(`<h2>Your IP ${ipAddress}</h2>`);
});

app.get('/get_location', (req, res) => {
  res.send('<h1></h1>');
  // let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ipAddress = ip.address();
  console.log(parseInt(ipAddress, 10));
  req.remoteAddress;
  req.socket.remoteAddress || req.socket.remoteAddress;

  oneEl(jsonData, ipAddress);
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
