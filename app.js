const express = require('express');
const app = express();
const morgan = require('morgan')
const TiffCompressor = require('./route/Tifcompressor')
const cors =require('cors');



const port = 4013

app.use(express.json());
const corsOptions = {
  origin: [
      'http://localhost:4111'
  ],
  methods: ['GET', 'POST'],
  preflightContinue: true, 
};

app.use(cors());

app.use(morgan('dev'))




app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ extended: true }))


//root
app.use('/api/tiff',TiffCompressor)


 
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });