import fs from 'fs';
import * as url from 'url';
import express from 'express';
import ip from 'ip';
import { publicIpv4 } from 'public-ip';

const app = express();
const port = 3000;

const __dirname = url.fileURLToPath(new URL('./IPDB.CSV', import.meta.url));
let jsonData = fs.readFileSync(__dirname, 'utf8').split('\r\n');

app.get('/', (req, res) => {
  res.send('<h1>Geolocation says Hello</h1>');
});

app.get('/get_ip', (req, res) => {
  publicIpv4().then(ip => {
    res.send(`<h2>Your IP ${ip}</h2>`);
  });
});

app.get('/get_location', (req, res) => {
  const ipAddress =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;

  function formatToIp(strNumIP) {
    return (
      (strNumIP >>> 24) +
      '.' +
      ((strNumIP >> 16) & 255) +
      '.' +
      ((strNumIP >> 8) & 255) +
      '.' +
      (strNumIP & 255)
    );
  }

  const dataIpArr = renderLocation(jsonData, ipAddress);

  for (const el of dataIpArr) {
    let ip1 = Number(el.slice(0, 1));
    let ip2 = Number(el.slice(1, 2));

    // 1.1.255.255
    // 16908287
    const ipToNum =
      '223.252.0.0'.split('.').reduce((a, b) => (a << 8) | b) >>> 0;

    if (ipToNum >= ip1 && ipToNum <= ip2) {
      return res.json({
        'Your IP address': ipAddress,
        Location: el[3],
        'IP start': formatToIp(el[0]),
        'IP end': formatToIp(el[1]),
      });
    }
  }
});

function renderLocation(data, ip) {
  const arrEl = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const dataEl = element.replace(/["]/g, '').split(',');
    arrEl.push(dataEl);
  }

  return arrEl;
}

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
