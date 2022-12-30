import fs from 'fs';
import * as url from 'url';
import express from 'express';
const app = express();
const port = 3000;

const __dirname = url.fileURLToPath(new URL('./IPDB.CSV', import.meta.url));
let jsonData = fs.readFileSync(__dirname, 'utf8');
console.log(jsonData);

// app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
