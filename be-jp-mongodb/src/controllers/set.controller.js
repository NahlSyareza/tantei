const Letter = require("../models/LetterSchema");
const { Set, WordSet, LetterSet } = require("../models/SetSchema");

const create = async (req, res) => {
  const { name, type, owner } = req.body;

  let d;
  switch (type) {
    case "words":
      d = new WordSet({ name, owner });
      break;

    case "letters":
      d = new LetterSet({ name, owner });
      break;

    default:
      return res.status(200).json({
        success: false,
        msg: "Type not recognized",
        payload: [],
      });
  }

  try {
    await d.save();

    return res
      .status(200)
      .json({ success: true, msg: "Created new set!", payload: d });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const remove = async (req, res) => {
  const { set, item } = req.body;

  try {
    const c = await Set.findById(set);

    const match = c.items.find((e) => {
      return e._id == item;
    });

    if (!match) {
      return res.status(200).json({
        success: false,
        msg: "Item doesn't exist!",
      });
    }

    let d;
    switch (c.__t) {
      case "words":
        d = await WordSet.findOneAndUpdate(
          { _id: set },
          {
            $pull: {
              items: item,
            },
          },
          { new: true }
        );

        break;

      default:
        d = await LetterSet.findOneAndUpdate(
          { _id: set },
          {
            $pull: {
              items: item,
            },
          },
          { new: true }
        );
    }

    return res.status(200).json({
      success: true,
      msg: "Removed item from set",
      payload: d,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const add = async (req, res) => {
  const { set, item } = req.body;

  try {
    const c = await Set.findById(set);

    const match = c.items.find((e) => {
      return e._id == item;
    });

    if (match) {
      return res.status(200).json({
        success: false,
        msg: "Item already exist!",
      });
    }

    let d;
    switch (c.__t) {
      case "words":
        d = await WordSet.findOneAndUpdate(
          { _id: set },
          {
            $push: {
              items: item,
            },
          },
          { new: true }
        );
        break;

      case "letters":
        d = await LetterSet.findOneAndUpdate(
          { _id: set },
          {
            $push: {
              items: item,
            },
          },
          { new: true }
        );
        break;
    }

    return res.status(200).json({
      success: true,
      msg: "Added new item to set",
      payload: d,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getAll = async (req, res) => {
  const { p, s } = req.query;

  try {
    const d = await Set.find().lean().select(s).populate(p);

    return res.status(200).json({
      success: true,
      msg: "Sets retrieved!",
      payload: d,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const get = async (req, res) => {
  const { set } = req.params;
  const { p, s } = req.query;

  try {
    const d = await Set.findById(set).lean().select(s).populate(p);

    return res.status(200).json({
      success: true,
      msg: "Item from Set retrieved",
      payload: d,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

const getByOwner = async (req, res) => {
  const { owner } = req.params;
  const { p, s } = req.query;

  try {
    const d = await Set.find({ owner }).lean().select(s).populate(p);

    return res.status(200).json({
      success: true,
      msg: "Retrieved sets by owner",
      payload: d,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

module.exports = {
  create,
  add,
  getAll,
  get,
  getByOwner,
  remove,
};
