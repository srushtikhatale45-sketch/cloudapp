const crypto = require("crypto");

const encryptBuffer = (buffer) => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) return buffer; // encryption disabled if no key set

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key, "hex"), iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return Buffer.concat([iv, encrypted]); // prepend IV so restore-service can read it later
};

module.exports = { encryptBuffer };
