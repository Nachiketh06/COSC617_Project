const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
dotenv.config({ path: './config/config.env' });
const Transaction = require('./models/Transaction');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));


app.get('/api/v1/transactions/:id', async (req, res) => {
  try {
    console.log("I am here at get method for transacions");
    const userId = req.params.id;
    console.log(userId);
    const transactions = await Transaction.find({ 'userId': userId });
    console.log(transactions);
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});
app.delete('/api/v1/transactions/:id', async (req, res) => {
  console.log("In delete");
  try {
    const transaction = await Transaction.findById(req.params.id);
    console.log(transaction);
    // if(!transaction) {
    //   return res.status(404).json({
    //     success: false,
    //     error: 'No transaction found'
    //   });
    // }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
})

app.post('/api/v1/transactions', async (req, res) => {

  try {
    // const { text, amount,userId } = req.body;
    console.log(req.body);
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
});


app.post('/login', async (req, res) => {
  const { name, pass } = req.body;
  let password = pass;
  try {
    // Check for user by email
    const user = await User.findOne({ name: name });
    console.log(user);
    // if (!user) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid credentials'
    //   });
    // }

    // Compare password with hashed password in database
    const isMatch = password === user.pass;
    console.log()
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Send back user info, without the password
    const { pass, ...userInfo } = user.toObject();
    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: userInfo
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});
app.post('/signup', async (req, res) => {
  const { name, password, cpassword } = req.body;

  // Validate password and confirm password
  if (password !== cpassword) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    });
  }
  try {
    // Check if user already exists
    const userExists = await User.findOne({ name: name });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    

    // Create a new user
    const newUser = new User({
      name: name,
      pass: password
    });
    await newUser.save();

    // Send back the user info, without the password
    const { pass, ...userInfo } = newUser.toObject();
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userInfo
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

const PORT = 5001;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));



