const mongoose = require("mongoose");

const TranslationSchema = new mongoose.Schema({
  kanji_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Word",
  },
  english: {
    type: String,
    required: true,
  },
  indonesia: {
    type: String,
    required: false,
  },
});

TranslationSchema.index({
  kanji: 1,
});

const Translation = mongoose.model("Translation", TranslationSchema);

module.exports = Translation;
