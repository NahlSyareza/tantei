const express = require("express");
const router = express.Router();
const c = require("../controllers/translation.controller");

router.post("/add", c.add);
router.post("/addMany", c.addMany);
router.get("/getAll", c.getAll);

module.exports = router;
