const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../config/spaces");
const { decryptBuffer } = require("../decryption/decryptStream");
const { extractFirstFile } = require("../extraction/unzipper");

const streamToBuffer = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

const downloadAndRestore = async (storageKey, bucket) => {
  const command = new GetObjectCommand({ Bucket: bucket, Key: storageKey });
  const response = await s3Client.send(command);
  const zippedEncrypted = await streamToBuffer(response.Body);

  const zipped = decryptBuffer(zippedEncrypted);
  const { filename, buffer } = extractFirstFile(zipped);

  return { filename, buffer };
};

module.exports = { downloadAndRestore };
