const Letter = require("../models/LetterSchema");

const add = async (req, res) => {
  const { japanese, latin, clas } = req.body;

  const d = new Letter({ japanese, latin, clas });
  try {
    await d.save();

    return res.status(200).json({
      success: true,
      msg: "Letter added!",
      payload: d,
    });
  } catch (e) {
    return res.send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const d = await Letter.find();

    return res.status(200).json({
      success: true,
      msg: "Retrieved all letters!",
      payload: d,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  add,
  getAll,
};
