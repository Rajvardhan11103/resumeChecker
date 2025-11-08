// // routes/userRoutes.js
// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");   


// router.post("/register", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).send("User registered successfully!");
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).send("Invalid email or password");
//     }           
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send("Invalid email or password");
//     }   
//     res.status(200).send("Login successful!");
//   } catch (err) {
//     res.status(500).send(err.message);
//   } 
// });

// module.exports = router;
require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// ✅ REGISTER
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     // create user (password will be hashed in model)
//     const user = new User({ email, password });
//     await user.save();


//     // send welcome email
//     const subject = 'Welcome to My App!';
//     const html = `
//       <h2>Hello ${email},</h2>
//       <p>Thank you for registering on our platform!</p>
//       <p>You can now log in and start using our services.</p>
//       <br/>
//       <p>— The My App Team</p>
//     `;
//     await sendEmail(email, subject, html);
    



//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// ✅ LOGIN

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create user
    const user = new User({ username, email, password });
    await user.save();

    // Send welcome email (safe)
    const subject = 'Welcome to My App!';
    const html = `
      <h2>Hello ${username},</h2>
      <p>Thank you for registering on our platform!</p>
      <p>You can now log in and start using our services.</p>
      <br/>
      <p>— The My App Team</p>
    `;
    try {
      await sendEmail(email, subject, html);
    } catch (err) {
      console.error("Email sending failed:", err.message);
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err); // logs the actual error
    res.status(500).json({ error: err.message });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
     // Check if JWT secret is set
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is missing" });
    }


    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // token expires in 1 hour
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
