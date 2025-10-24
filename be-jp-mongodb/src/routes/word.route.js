const express = require("express");
const router = express.Router();
const c = require("../controllers/word.controller");

router.post("/add", c.add);
router.get("/getAll", c.getAll);
router.get("/get/:id", c.get);
router.get("/get", c.get);
router.get("/getLimit/:limit", c.getLimit);
router.post("/addMany", c.addMany);
router.get("/getAll/:sort", c.getAllSorted);

module.exports = router;
