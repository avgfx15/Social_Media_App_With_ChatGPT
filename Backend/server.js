const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const dbConnect = require('./DB/dbConnect');
const protectedRouter = require('./routes/protectedRoutes');
const postRoutes = require('./routes/postRoutes');
const { upload } = require('./Middleware/multer');
const likeRouter = require('./routes/likeRoutes');
const commentRouter = require('./routes/commentRouters');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://stacodevsocialmedia.netlify.app', // Deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Connect to MongoDB
dbConnect();

// Middleware for JSON parsing
app.use(express.json());

// Serve the uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/', protectedRouter);
// Other routes
app.use('/api', likeRouter);

app.use('/api', commentRouter);

// API endpoint to handle image upload
app.post('/api/uploads', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const filePath = req.file.filename;
  res
    .status(200)
    .json({ message: 'Image uploaded successfully', url: filePath });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
