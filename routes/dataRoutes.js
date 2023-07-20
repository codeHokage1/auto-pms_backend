const express = require("express");
const router = express.Router();

const dataController = require("../controllers/dataController");

router
	.get("/", dataController.getAllData)
	.get("/:meterNo", dataController.getDataByMeter)
	.post("/:meterNo", dataController.addData);

module.exports = router;
