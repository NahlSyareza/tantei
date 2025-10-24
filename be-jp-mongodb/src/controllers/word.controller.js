const Word = require("../models/WordSchema");

const add = async (req, res) => {
  const { japanese, latin, translation, kanji, type } = req.body;
  const d = new Word({ japanese, latin, translation, kanji, type });

  try {
    await d.save();

    return res.status(200).json({
      success: true,
      msg: "Word added!",
      payload: d,
    });
  } catch (e) {
    return res.send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const d = await Word.find().lean();
    return res.status(200).json({
      success: true,
      msg: "Words retrieved!",
      payload: d,
    });
  } catch (e) {
    return res.send(e);
  }
};

const getAllSorted = async (req, res) => {
  const { sort } = req.params;
  const { sort_type = 1 } = req.query;

  try {
    const d = await Word.find()
      .lean()
      .sort({
        [sort]: parseInt(sort_type),
      });
    return res.status(200).json({
      success: true,
      msg: "Sorted words received!",
      payload: d,
    });
  } catch (e) {
    return res.send(e);
  }
};

const get = async (req, res) => {
  const { id } = req.params;

  try {
    let d;

    if (id) {
      d = await Word.find({ _id: id });
    } else {
      d = await Word.find();
    }

    return res.status(200).json({
      success: true,
      msg: "Words retrieved!",
      payload: d,
    });
  } catch (e) {
    res.send(e);
  }
};

const getLimit = async (req, res) => {
  const { limit } = req.params;

  try {
    const d = await Word.aggregate([{ $sample: { size: parseInt(limit) } }]);

    return res.status(200).json({
      success: true,
      msg: `Retrieved ${limit} random words!`,
      payload: d,
    });
  } catch (e) {
    return res.send(e);
  }
};

const addMany = async (req, res) => {
  const { batch } = req.body;

  const arr = [];

  try {
    batch.forEach(async (element) => {
      arr.push(element);
      console.log(
        `${element.japanese} ${element.latin} ${element.translation} ${element.kanji} ${element.type}`
      );
      const j = element.japanese;
      const l = element.latin;
      const e = element.translation;
      const f = element.kanji;
      const z = element.type;
      const d = new Word({
        japanese: j,
        latin: l,
        translation: e,
        kanji: f,
        type: z,
      });

      await d.save();
    });

    return res.status(200).json({
      success: true,
      msg: "Added new words",
      payload: arr,
    });
  } catch (e) {
    return res.send(e);
  }
};

module.exports = {
  add,
  getAll,
  get,
  getLimit,
  addMany,
  getAllSorted,
};
