import fs from 'fs/promises';
import path from 'path';

const fileToRead = './instagramGiveaway/data';

const argv = process.argv;

// const fn = async () => {
//   const result = await fs.readdir(fileToRead, (err, files) => {
//     console.log(result);
//   });
//   return result;
// };

// fn();

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      fs.readFile(dirname + filename, 'utf-8', function (err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

readFiles(fileToRead);
