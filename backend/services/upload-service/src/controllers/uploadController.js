const { Upload } = require("@aws-sdk/lib-storage");
const { v4: uuidv4 } = require("uuid");
const s3Client = require("../config/spaces");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const key = `backups/${uuidv4()}-${req.file.originalname}`;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.SPACES_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ACL: "private",
        ContentType: req.file.mimetype,
      },
    });

    await upload.done();

    return res.status(201).json({
      message: "File uploaded successfully",
      key,
      bucket: process.env.SPACES_BUCKET,
      size: req.file.size,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

module.exports = { uploadFile };
