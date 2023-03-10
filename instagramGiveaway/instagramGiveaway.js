import fs from 'fs';
import path from 'path';
import * as url from 'url';
import _ from 'lodash';

const __dirname = url.fileURLToPath(new URL('./data', import.meta.url));

const files = fs.readdirSync(__dirname);

function uniqueValues(filesArr) {
  let uniqueValue = new Set();
  filesArr.forEach(file => {
    const filePath = path.join(__dirname, file);
    const array = fs.readFileSync(filePath, 'utf-8').toString().split('\n');

    // for each
    for (const key in array) {
      uniqueValue.add(array[key]);
    }
  });
  return `Unique phrases: ${uniqueValue.size}`;
}

function existInAllFiles(filesArr) {
  let fullValuesArray = new Array();
  filesArr.forEach(file => {
    const filePath = path.join(__dirname, file);
    const array = fs.readFileSync(filePath, 'utf-8').toString().split('\n');
    fullValuesArray.push(array);
  });
  // переписати без бібл
  let existValues = _.intersection.apply(_, fullValuesArray);

  return `Exist in all files: ${existValues.length}`;
}

function existInAtLeastTen(filesArr) {
  let ten = new Array();

  filesArr.forEach(file => {
    const filePath = path.join(__dirname, file);
    const array = fs.readFileSync(filePath, 'utf-8').toString().split('\n');

    array.forEach(arr => {
      ten.push(arr);
    });
  });

  const object = ten.reduce((acc, el) => {
    if (!acc.hasOwnProperty(el)) {
      acc[el] = 0;
    }
    acc[el] += 1;

    return acc;
  }, {});

  let atLeastTen = new Array();
  for (const key in object) {
    if (object[key] >= 10) {
      atLeastTen.push(key);
    }
  }
  return `Exist in at least ten files ${atLeastTen.length}`;
}

console.log(uniqueValues(files));
console.log(existInAllFiles(files));
console.log(existInAtLeastTen(files));

// Execution time
// uniqueValues: 904ms - 912ms
// existInAllFiles: 931ms - 950ms
// existInAtLeastTen: 1.1s - 1.2s

// Results
// uniqueValues: 129240
// existInAllFiles: 441
// existInAtLeastTen: 108345

// ------------------------------------------------
// console.time('1');
// const start= new Date().getTime();
// existInAllFiles(files)
// const end = new Date().getTime();
// console.log(`SecondWay: ${end - start}ms`);
// console.timeEnd('1')
