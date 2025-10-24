const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema(
  {
    japanese: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    latin: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
      required: true,
    },
    kanji: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

WordSchema.index(
  {
    japanese: 1,
    latin: 1,
    translation: 1,
    kanji: 1,
  },
  {
    unique: true,
  }
);

const Word = mongoose.model("Word", WordSchema);

module.exports = Word;
