// s3-utils.js
const AWS = require('aws-sdk');

import Config from 'react-native-config';
import axios from 'axios';


// AWS.config.update({
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//     region: AWS_REGION,
//   });

const s3Config = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
};

const s3 = new AWS.S3(s3Config);

const listObjects = (bucketName) => {

  const params = {
    Bucket: bucketName,
  };
  return s3.listObjectsV2(params).promise();
};

export async function getSignedUrl(bucketName, key) {

// console.log(s3Config.accessKeyId)
// console.log(Config.REACT_APP_AWS_ACCESS_KEY_ID)
  const params = {
    Bucket: bucketName,
    Key: key,
    // Expires: 60, // URL expires in 60 seconds
  };
  return s3.getSignedUrlPromise('getObject', params);
};

// Function to fetch the S3 object using Axios
export async function  fetchS3Object (url){
    try {
      const response = await axios.get(url);
      console.log('S3 Object Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching S3 object:', error);
      throw error;
    }
  };

module.exports = { listObjects, getSignedUrl, fetchS3Object };
