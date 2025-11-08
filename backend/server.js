const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./src/routes/auth');
const resumeRoutes = require('./src/routes/resume');

app.use('/api/resume', resumeRoutes);
// Serve uploaded resumes from src/uploads
app.use('/uploads', express.static(__dirname + '/src/uploads'));

const corsOptions = {
  origin: 'http://localhost:3000', // Adjust this to your frontend's origin
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;