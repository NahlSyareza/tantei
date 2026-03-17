const Translation = require("../models/TranslationSchema");

const add = async (req, res) => {
  const { kanji_id, english, indonesia } = req.body;
  const d = new Translation({ kanji_id, english, indonesia });

  try {
    await d.save();
    return res.status(200).json({
      success: true,
      msg: "Translation added!",
      payload: d,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const addMany = async (req, res) => {
  const arr = req.body;

  const rs = [];

  try {
    arr.forEach(async (e) => {
      const { kanji_id, english, indonesia } = e;

      if (!kanji_id || !english || !indonesia) {
        return;
      }

      const d = new Translation({ kanji_id, english, indonesia });

      await d.save();

      console.log(d);

      rs.push(d);
    });

    return res.status(200).json({
      success: true,
      msg: "Test payload",
      payload: rs,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const d = await Translation.find().populate("kanji_id").lean();
    return res.status(200).json({
      success: true,
      msg: "Translations retrieved!",
      payload: d,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = { add, addMany, getAll };
