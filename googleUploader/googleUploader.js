import { google } from 'googleapis';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

const GOOGLE_API_FOLDER_ID = '1LSLda3wBQDCnbFEP0TE8Az4VlDUHI6Pn';

async function uploader(link, fileName, extension) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './imageUploader.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    const fileMetaData = {
      name: `${fileName}${extension}`,
      parents: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: `image/${extension}`,
      body: fs.createReadStream(link),
    };

    const response = await driveService.files.create({
      resource: fileMetaData,
      media,
      field: 'id',
    });

    return response.data.id;
  } catch (error) {
    console.log('Upload file error', error);
  }
}

// uploader().then(data => {
//   console.log(data);
// });

function cliApp() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Pls, drag and drop the picture to terminal and press ENTER:',
        name: 'imgLink',
      },
      {
        type: 'confirm',
        message: 'Would you like to change the name of the file?',
        name: 'changeLink',
        when(answers) {
          const pathName = answers.imgLink.split('/').pop();
          const fileExtension = answers.imgLink.split('.').reverse()[0];

          if (answers[`imgLink`]) {
            console.log('Path to file: ', answers.imgLink);
            console.log('File name: ', pathName);
            console.log('Extension: ', fileExtension);
          }
          return answers.imgLink;
        },
      },
      {
        type: 'input',
        message: 'Enter new file name, without extensions .jpg  .png',
        name: 'newName',
        when(answers) {
          if (answers.changeLink) {
            return answers.changeLink;
          }
          return answers.changeLink;
        },
      },
      {
        type: 'confirm',
        message: 'Would you like to shorten link?',
        name: 'shortenLink',
        when(answers) {
          if (answers[`newName`]) {
            console.log({ newName: answers.newName });
          }
          return answers.changeLink;
        },
      },
    ])
    .then(answers => {
      let parseLink = path.parse(answers.imgLink);
      let imgLink = answers.imgLink;
      let newFileName = answers.newName;

      if (answers.changeLink) {
        uploader(imgLink, newFileName, parseLink.ext).then(data =>
          console.log(data),
        );
      } else {
        uploader(imgLink, newFileName, parseLink.ext).then(data =>
          console.log(data),
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
}

cliApp();
