const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // Limit file size to 100MB
  },
 
});

module.exports = upload;
