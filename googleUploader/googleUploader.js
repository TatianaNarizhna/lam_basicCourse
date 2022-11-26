import fs from 'fs/promises';
import { google } from 'googleapis';

const GOOGLE_API_FOLDER_ID = '1RVoXQ8GTXA1h2tyiihM4EJFKV3ounLXS';

async function uploader() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './googleKey.json',
      scope: ['http://www.googleapis.com/auth/drive'],
    });

    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    const fileMetaData = {
      name: 'flowers.jpg',
      parent: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: 'image/jpg',
      body: fs.createReadStream('./flowers.jpg'),
    };

    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: 'id',
    });

    return response.data.id;
  } catch (error) {
    console.log('Upload file error', error);
  }
}

uploader().then(data => {
  console.log(data);
});
