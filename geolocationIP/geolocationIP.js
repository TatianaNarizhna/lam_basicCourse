import fs from 'fs';
import * as url from 'url';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.json());

const __dirname = url.fileURLToPath(new URL('./IPDB.CSV', import.meta.url));
let jsonData = fs.readFileSync(__dirname, 'utf8').split('\r\n');
console.log(jsonData);

// app.use((req, res) => {
//   const request = req.body;
//   const reqIp = request.ip.split('.').reduce((r, e) => r * 256 + +e);
//   console.log(reqIp);
// });

app.get('/', (req, res) => {
  const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
  res.send(ipAddress);
});

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
