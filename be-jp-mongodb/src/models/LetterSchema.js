const mongoose = require("mongoose");

const LetterSchema = new mongoose.Schema(
  {
    japanese: {
      type: String,
      required: true,
    },
    latin: {
      type: String,
      required: true,
    },
    clas: {
      type: String,
      enum: ["hiragana", "katakana"],
      required: true,
    },
  },
  { timestamps: true }
);

const Letter = mongoose.model("Letter", LetterSchema);

module.exports = Letter;
