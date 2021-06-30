const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = 8000;

const app = express();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);
app.get("/", (req, res) => {
  res.send("Hello...");
});



app.listen(PORT, () => {
  console.log("Appis listening on Port :-" + PORT);
});
