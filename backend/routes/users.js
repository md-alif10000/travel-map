const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { Error } = require("mongoose");

//register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
      !validPassword && res.status(400).json("Wrong username or password");
          return res.status(200).json(user);
      


  } catch (error) {
          res.status(500).json(error);
  }
});

module.exports = router;
