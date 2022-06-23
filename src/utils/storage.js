/** @format */

const { Storage } = require('@google-cloud/storage');
const uuid = require('uuid');
const path = require('path');
const { Readable } = require('stream');
const { googleProjectId, googleBucketName } = require('../config');

const storage = new Storage({
  projectId: googleProjectId,
  keyFilename: path.join(__dirname, '../config/credentials.json'),
});

const bucket = storage.bucket(googleBucketName);

const uploadFile = async (file) => {
  const ext = path.extname(file.originalname);
  const fileName = `${uuid.v4()}${ext}`;
  const cloudFile = bucket.file(fileName);
  const stream = Readable.from(file.buffer);

  return new Promise((resolve, reject) => {
    stream
      .pipe(
        cloudFile.createWriteStream().on('finish', () => {
          resolve({
            success: true,
            fileName,
            url:
              'https://storage.googleapis.com/' +
              googleBucketName +
              '/' +
              fileName,
          });
        })
      )
      .on('error', (err) => {
        reject({
          success: false,
          error: err,
        });
      });
  });
};


module.exports = { uploadFile };