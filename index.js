const express = require("express");
const path = require("path");
const multer = require("multer");
const { localServerStorage } = require("./utils");
const PORT = 8080;
const app = express();
const localIpAddress = '192.168.166.200';

const upload = multer({ storage: localServerStorage });

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "view", "home.html"));
});

// Handle file upload
app.post("/upload", upload.fields([{ name: 'fileInput', maxCount: 10 }, { name: 'folderName' }]), (req, res) => {
  res.sendFile(path.join(__dirname, "view", "upload_success.html"));
});

app.listen(PORT, localIpAddress, () => {
  console.log(`listening on ${PORT}`);
});
