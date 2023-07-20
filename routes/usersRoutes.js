const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");

router
	.get("/", usersController.getAllUsers)
	.get("/:userId", usersController.getOneUser)

	.post("/:userId", (req, res) => {
		res.send("Send details for a user");
	})
	.put("/:userId", (req, res) => {
		res.send("Update details for a user");
	});

module.exports = router;
