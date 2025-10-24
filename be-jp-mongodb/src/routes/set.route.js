const express = require("express");
const router = express.Router();
const c = require("../controllers/set.controller");

router.post("/create", c.create);
router.post("/add", c.add);
router.get("/getAll", c.getAll);
router.get("/get/:set", c.get);
router.get("/getByOwner/:owner", c.getByOwner);
router.post("/remove", c.remove);

module.exports = router;
