const archiver = require("archiver");
const { PassThrough } = require("stream");

const zipBuffer = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const stream = new PassThrough();
    const archive = archiver("zip", { zlib: { level: 9 } });

    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));

    archive.on("error", reject);
    archive.pipe(stream);
    archive.append(fileBuffer, { name: filename });
    archive.finalize();
  });
};

module.exports = { zipBuffer };
