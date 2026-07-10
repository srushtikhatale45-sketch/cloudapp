const { S3Client } = require('@aws-sdk/client-s3');

// DigitalOcean Spaces is S3‑compatible
const s3 = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT, // e.g., https://nyc3.digitaloceanspaces.com
  region: process.env.SPACES_REGION,
  credentials: {
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET,
  },
  forcePathStyle: false, // required for Spaces
});

module.exports = s3;