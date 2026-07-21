const axios = require("axios");
const FormData = require("form-data");
const { zipBuffer } = require("../compression/zipper");
const { encryptBuffer } = require("../encryption/aes256");
const { createBackupRecord } = require("./metadataService");
const { UPLOAD_SERVICE_URL } = require("../config/services");

const runBackup = async (fileBuffer, originalName) => {
  const zipped = await zipBuffer(fileBuffer, originalName);
  const finalBuffer = encryptBuffer(zipped);

  const form = new FormData();
  form.append("file", finalBuffer, `${originalName}.zip`);

  const uploadResponse = await axios.post(`${UPLOAD_SERVICE_URL}/api/upload`, form, {
    headers: form.getHeaders(),
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });

  const { key, bucket } = uploadResponse.data;

  const record = await createBackupRecord({
    originalName,
    storageKey: key,
    bucket,
    sizeBytes: finalBuffer.length,
  });

  return record;
};

module.exports = { runBackup };
