const express = require('express');
const cors = require('cors');
const multer = require('multer');
const port = 3000;
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${Date.now()}_${file.originalname}`;
    return cb(null, uniqueFileName);
  }
});


const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.send({ path: req.file.filename });
});

app.get('/uploadedImages', (req, res) => {
  const imageDirectory = path.join(__dirname, 'public/images');
  fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading the image directory');
    }
    res.json(files);
  });
});


  

app.use('/uploaded', express.static(path.join(__dirname, 'public/images')));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
