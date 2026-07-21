const crypto = require("crypto");

const decryptBuffer = (buffer) => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) return buffer;

  const iv = buffer.subarray(0, 16);
  const encrypted = buffer.subarray(16);
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};

module.exports = { decryptBuffer };
