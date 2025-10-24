const express = require("express");
const router = express.Router();
const c = require("../controllers/letter.controller");

router.post("/add", c.add);
router.get("/getAll", c.getAll);

module.exports = router;
