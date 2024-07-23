    const express = require('express');
    const TiffCompressor = require('../controller/TiffCompressor');
    const upload = require('../utils/multer');
    const router = express.Router();

    router.post('/tiffcompressor',upload.single('image'),TiffCompressor.CompressTif);
    router.get('/download/:imageId' , TiffCompressor.DownloadCompressedImage)

    module.exports=router;