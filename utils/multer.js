const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 20MB limit in bytes
  },
 
});

module.exports = upload;
