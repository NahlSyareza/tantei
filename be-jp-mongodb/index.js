const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const word = require("./src/routes/word.route");
const user = require("./src/routes/user.route");
const set = require("./src/routes/set.route");
const letter = require("./src/routes/letter.route");
const translation = require("./src/routes/translation.route");

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const PORT = process.env.PORT;

const app = express();

mongoose.connect(CONNECTION_STRING);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/word", word);
app.use("/user", user);
app.use("/set", set);
app.use("/translation", translation);
// app.use("/letter", letter);

app.get("/", async (req, res) => {
  return res.send("にほんごをわかります!");
});

app.listen(PORT, () => {
  console.log(`🍃 Backend start at http://localhost:${PORT}`);
});
