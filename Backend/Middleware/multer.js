const multer = require('multer');

// Set up storage configuration for Multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../Frontend/public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueFileName = new Date().getTime() + file.originalname;
    cb(null, uniqueFileName); // Append extension
  },
});

const upload = multer({ storage });

module.exports = { upload };
