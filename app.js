const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadRoute = require('./upload');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

app.get('/', (req, res) => res.render('index'));
app.post('/upload', upload.single('datafile'), uploadRoute);
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));