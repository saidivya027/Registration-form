const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userRegistration', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Handle registration form submission
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Create a new user
    const newUser = new User({ username, email, password });
    
    // Save the user to the database
    await newUser.save();

    // Redirect to a success page or do something else
    res.send('Registration successful!');
  } catch (error) {
    // Handle errors
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
