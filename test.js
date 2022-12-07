import { google } from 'googleapis';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

const GOOGLE_API_FOLDER_ID = '1eoKmpDpBzA_-CZXfmkzu46RUtJAHg0Fq';

async function uploader() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: '../googleUploader/imageapi-370811-4cd16a3806ea.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    const fileMetaData = {
      name: 'flowers.jpg',
      parents: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: 'image/jpg',
      body: fs.createReadStream(
        '../../lam_basicCourse/googleUploader/flowers.jpg',
      ),
    };

    const response = await driveService.files.create({
      resource: fileMetaData,
      media,
      field: 'id',
    });

    return response.data.id;
  } catch (error) {
    console.log(error);
  }
}

uploader().then(data => {
  console.log(data);
});
