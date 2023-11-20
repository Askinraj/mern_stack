// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/react-express-mongoose', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose model and routes here (for simplicity, let's create a User model)
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;

  try {
    const createdUser = await User.create({
      username,
      password,
    });

    console.log('User created:', createdUser);
    res.json(createdUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
