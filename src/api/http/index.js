const express = require("express");

const materialsApi = require("./materials");

var router = express.Router();

router.use("/materials", materialsApi(express.Router()));

module.exports = router;
