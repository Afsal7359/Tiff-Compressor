const sharp = require('sharp');


module.exports={
    CompressTif : async(req,res)=>{
        try {
            const inputPath = req.file.path;
            const {fileName}=req.body;
            
              // Compress the image to a buffer using sharp
                const compressedBuffer = await sharp(inputPath)
                .tiff({ quality: 50 }) // Adjust the quality as needed
                .toBuffer();

                // Generate a unique identifier for the image (e.g., a timestamp)
                const imageId = Date.now().toString();
                 // Store the buffer in memory (for simplicity, using a global variable here)
                global.imageBuffers = global.imageBuffers || {};
                global.imageBuffers[fileName] = compressedBuffer;
                // Generate the download link
                const downloadLink = `${req.protocol}://${req.get('host')}/api/tiff/download/${fileName}`;

                res.json({
                message: 'Image Compressed Successfully',
                Link: downloadLink
                });                            

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error",
            })
        }
    },
    DownloadCompressedImage : async(req,res)=>{
        try {
            const imageId = req.params.imageId;
  
            // Check if the buffer exists for the given image ID
            if (global.imageBuffers && global.imageBuffers[imageId]) {
              const imageBuffer = global.imageBuffers[imageId];
          
              // Log for debugging
              console.log(`Serving compressed image with ID: ${imageId}`);
          
              // Set headers for file download
              res.set({
                'Content-Type': 'image/tif',
                'Content-Disposition': `attachment; filename="${imageId}.tif"`
              });
          
              // Send the image buffer
              res.send(imageBuffer);
          
              // Optionally, you can delete the buffer from memory after sending it
              delete global.imageBuffers[imageId];
            } else {
                console.log(`Image ID ${imageId} not found`);
                res.status(404).send('Image not found');
              }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message:"Server Error"
            })
        }
    }
}