const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define a schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// Route to save data
app.post('/save_data', async (req, res) => {
  const { name, email } = req.body;

  const newUser = new User({ name, email });
  try {
    await newUser.save();
    res.status(201).send({ message: 'User saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving user', error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
