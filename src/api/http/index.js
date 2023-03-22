const express = require("express");

const materialsApi = require("./materials");
const parametersApi = require("./parameters");
const textureApi = require("./texture");
const mappingApi = require("./mappings");
const metaMaterialApi = require("./meta-materials");

var router = express.Router();

router.use("/materials", materialsApi(express.Router()));
router.use("/parameters", parametersApi(express.Router()));
router.use("/texture", textureApi(express.Router()));
router.use("/mappings", mappingApi(express.Router()));
router.use("/meta-materials", metaMaterialApi(express.Router()));

module.exports = router;
