import { google } from 'googleapis';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { type } from 'os';

const GOOGLE_API_FOLDER_ID = '1LSLda3wBQDCnbFEP0TE8Az4VlDUHI6Pn';

let link = null;

const auth = new google.auth.GoogleAuth({
  keyFile: './imageUploader.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});

async function uploader() {
  try {
    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    let fileMetaData = {
      name: 'pict.jpg',
      parents: [GOOGLE_API_FOLDER_ID],
    };

    let media = {
      mimeType: 'image/jpg',
      body: fs.createReadStream(`./flowers.jpg`),
    };

    let response = await driveService.files.create({
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
        message: 'Would you like to change it?',
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
        name: 'changeLink',
        when(answers) {
          return answers.imgLink;
        },
      },
    ])
    .then(answers => {
      // if (typeof answers['imgLink'] === 'enter') {
      //   console.log('Path to file: ', answers.imgLink);
      // }
      // console.log(answers.imgLink);
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

cliApp();
