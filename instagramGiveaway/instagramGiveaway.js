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

console.log(uniqueValues (files))
console.log(existInAllFiles(files));

// console.time('1');
// const start= new Date().getTime();
// existInAllFiles(files)
// const end = new Date().getTime();
// console.log(`SecondWay: ${end - start}ms`);
// console.timeEnd('1')


// Execution time
// uniqueValues: 61-62ms
// existInAllFiles: 42-44ms

// Results
// uniqueValues:
// existInAllFiles: 



// function uniqueValues() {
//   const data = onGetData(repoToRead)
//   console.log(data);

//   // const uniqueNames = data.filter((el, index, arr) => arr.indexOf(el) === index)
//   // console.log(uniqueNames)
//   // return uniqueNames;

// }

// uniqueValues()



// const onRepoToRead = async rep => {
//   try {
//     const result = await fs.readdir(rep);
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const onFileToRead = async () => {
//   try {
//     const fileText = await onRepoToRead(repoToRead);

//     const txt = fileText.forEach(file => {
//       const dataPath = path.join(__dirname, file);
//       return dataPath;
//     });
//     await fs.readFile(txt, 'utf-8');
//     console.log(txt);
//     return txt;
//   } catch (error) {
//     console.error(error);
//   }
// };

// onFileToRead();

// const onMakeArray = async () => {
//   try {
//     const files = await onFileToRead();
//     console.log(files);
//     const array = files.toString().split('\n');
//   } catch (error) {
//     console.error(error);
//   }
// };

// onMakeArray();

// resultingArray();



  //  fls.forEach(file => {
  //     const dataPath = path.join(__dirname, file);

  //     fs.readFileSync(dataPath, 'utf-8', (err, content) => {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //    console.log(content);
  //       const array = content.toString().split('\n');
  //       // let pop = array.pop()
  //       // let res = new Set(array).size
   
  //       console.log(array);
  //     });
  //   });
