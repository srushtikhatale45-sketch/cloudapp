const AdmZip = require("adm-zip");

const extractFirstFile = (zipBuffer) => {
  const zip = new AdmZip(zipBuffer);
  const entries = zip.getEntries();
  if (entries.length === 0) throw new Error("Zip file is empty");

  const entry = entries[0];
  return {
    filename: entry.entryName,
    buffer: entry.getData(),
  };
};

module.exports = { extractFirstFile };
