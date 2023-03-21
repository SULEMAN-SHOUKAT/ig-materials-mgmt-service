const express = require("express");

const materialsApi = require("./materials");
const parametersApi = require("./parameters");
const textureApi = require("./texture");

var router = express.Router();

router.use("/materials", materialsApi(express.Router()));
router.use("/parameters", parametersApi(express.Router()));
router.use("/texture", textureApi(express.Router()));

module.exports = router;
