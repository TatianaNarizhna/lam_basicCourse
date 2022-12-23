import fs from 'fs';
import path from 'path';
import * as url from 'url';
import intersection from 'lodash.intersection';

const repoToRead = './instagramGiveaway/data';
const argv = process.argv;

const __dirname = url.fileURLToPath(new URL('./data', import.meta.url));

const files = fs.readdirSync(__dirname)

function uniqueValues (filesArr) {
   let uniqueValue = new Set()
   filesArr.forEach(file => {
      const filePath = path.join(__dirname, file);
      const array = fs.readFileSync(filePath, 'utf-8').toString().split("\n")
  
     for (const key in array) { 
      uniqueValue.add(array[key]) ; 
   }
   });
   return `Unique phrases: ${uniqueValue.size}`
}


function existInAllFiles(filesArr) {
  let fullValuesArray = new Array()
  filesArr.forEach(file => {
    const filePath = path.join(__dirname, file);
    const array = fs.readFileSync(filePath, 'utf-8').toString().split("\n")
    fullValuesArray.push(array)
  })
  let existValues = intersection(fullValuesArray )

  return `Exist in all files: ${existValues.length}`
}

function existInAtLeastTen(filesArr) {
  let ten = new Array()
  
  filesArr.forEach(file => {
    const filePath = path.join(__dirname, file);
    const array = fs.readFileSync(filePath, 'utf-8').toString().split("\n")
 
   array.forEach(arr => {
      ten.push(arr)
    })
  })

  const object = ten.reduce((acc, el) => {
    if(!acc.hasOwnProperty(el)) {
      acc[el] = 0
    }
    acc[el] +=1
    
    return acc;
  }, {})

    let atLeastTen = new Array()
     for (const key in object) {
       if(object[key] >= 10) { 
        atLeastTen.push(key)
       }
    }
    return `Exist in at least ten files ${atLeastTen.length}`
}

console.log(uniqueValues (files))
console.log(existInAllFiles(files));
console.log(existInAtLeastTen(files))


console.time('1');
// const start= new Date().getTime();
existInAtLeastTen(files)
// const end = new Date().getTime();
// console.log(`SecondWay: ${end - start}ms`);
console.timeEnd('1')


// Execution time
// uniqueValues: 61-62ms
// existInAllFiles: 42-44ms
// existInAtLeastTen: 4ms

// Results
// uniqueValues:
// existInAllFiles: 
// existInAtLeastTen: 


