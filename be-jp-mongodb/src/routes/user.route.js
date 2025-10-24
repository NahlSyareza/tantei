const express = require("express");
const router = express.Router();
const c = require("../controllers/user.controller");

router.post("/register", c.register);
router.post("/login", c.login);
router.get("/getAll", c.getAll);

module.exports = router;
