import fs from 'fs/promises';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('./data', import.meta.url));

const repoToRead = './instagramGiveaway/data';

const argv = process.argv;

const onRepoToRead = async rep => {
  try {
    const result = await fs.readdir(rep);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const onFileToRead = async () => {
  try {
    const fileText = await onRepoToRead(repoToRead);

    const txt = fileText.forEach(file => {
      const dataPath = path.join(__dirname, file);
      return dataPath;
    });
    await fs.readFile(txt, 'utf-8');
    console.log(txt);
    return txt;
  } catch (error) {
    console.error(error);
  }
};

onFileToRead();

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

// fs.readdir(repoToRead, (err, files) => {
//   if (err) {
//     onError(err);
//     return;
//   }
//   files.forEach(file => {
//     const dataPath = path.join(__dirname, file);

//     fs.readFile(dataPath, 'utf-8', (err, content) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       const array = content.toString().split('\n');
//       console.log(array);
//     });
//   });
// });
