const express = require("express");
const router = express.Router();

const users = require("../models/usersModel");

router.get("/", (req, res) => {
  const query = req.query;
  res.send({
    message: "working...",
    currentQuery: query,
  });
});

// CREATE AN ACCOUNT
router.post("/", async (req, res) => {
  try {
    // Check if email or username already exists
    const existingUser = await users.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or username already exists",
      });
    }

    // If not exists, proceed to save new user
    const newUser = new users(req.body);
    await newUser.save();

    res.status(200).json({
      message: "User successfully added",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was a server error!",
    });
  }
});

// LOGIN INTO THE ACCOUNT (Check User and Password)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with provided email and password exists
    const existingUser = await users.findOne({ email, password });

    if (existingUser) {
      // Extract the 'role' property from the existing user
      const { role } = existingUser;

      return res.status(200).json({
        message: "Login successful",
        status: true,
        role: role,
      });
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
        status: false,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was a server error!",
    });
  }
});

module.exports = router;
