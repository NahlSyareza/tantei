const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const WordSetSchema = new mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const LetterSetSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Letter",
    },
  ],
});

const Set = mongoose.model("Set", SetSchema);
const WordSet = Set.discriminator("words", WordSetSchema);
const LetterSet = Set.discriminator("letters", LetterSetSchema);

module.exports = { Set, WordSet, LetterSet };
