const { downloadAndRestore } = require("../services/restoreService");

const restoreBackup = async (req, res) => {
  try {
    const { storageKey, bucket } = req.body;
    if (!storageKey || !bucket) {
      return res.status(400).json({ message: "storageKey and bucket are required" });
    }

    const { filename, buffer } = await downloadAndRestore(storageKey, bucket);

    res.set("Content-Disposition", `attachment; filename="${filename}"`);
    res.set("Content-Type", "application/octet-stream");
    return res.status(200).send(buffer);
  } catch (err) {
    console.error("Restore error:", err.message);
    return res.status(500).json({ message: "Restore failed", error: err.message });
  }
};

module.exports = { restoreBackup };
