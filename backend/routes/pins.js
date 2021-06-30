const router = require("express").Router();
const Pin = require("../models/Pin");

// create a pin

router.post("/", async (req, res) => {
  try {
    const newPin = await new Pin(req.body);
    const savedPin = await newPin.save();
    return res.status(201).json(savedPin);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get pins

router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find({});
    return res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
