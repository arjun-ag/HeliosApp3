// s3-utils.js
const AWS = require('aws-sdk');

const s3Config = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
};

const s3 = new AWS.S3(s3Config);

const listObjects = (bucketName) => {
  const params = {
    Bucket: bucketName,
  };
  return s3.listObjectsV2(params).promise();
};

const getSignedUrl = (bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Expires: 60, // URL expires in 60 seconds
  };
  return s3.getSignedUrlPromise('getObject', params);
};

module.exports = { listObjects, getSignedUrl };
