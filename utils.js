const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer to specify where to store uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create the folder structure if it doesn't exist
    if (!fs.existsSync("assets")) {
      fs.mkdirSync("assets", { recursive: true });
    }

    cb(null, "assets"); // The files will be saved in the "assets" folder
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const timestamp = Date.now();

    // Check if the file already exists
    let newFileName = originalname;

    while (fs.existsSync(path.join("assets", newFileName))) {
      newFileName = `${path.basename(
        originalname,
        extension
      )}_${timestamp}${extension}`;
    }

    cb(null, newFileName);
  },
});

module.exports = {
  localServerStorage: storage,
};
