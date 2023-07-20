const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json({ data: users });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

exports.getOneUser = async (req, res) => {
	try {
		const foundUser = await User.findById(String(req.params.userId));
		if (!foundUser) return res.status(404).json({ error: "User not found" });

		res.json(foundUser);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

exports.deleteOneUser = async (req, res) => {
	try {
		const foundUser = await User.findOne({ _id: req.params.userId });
		if (!foundUser) return res.status(404).json({ error: "User not found" });

		const deleted = await User.delete({ _id: req.params.userId });
		res.status(201).json({ message: "User deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
