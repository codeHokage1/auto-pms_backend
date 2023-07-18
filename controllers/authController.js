const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Please enter email and password" });
	}

	try {
		// find user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ error: `User with email ${email} already exists` });
		}

		const newUser = await User.create(req.body);
		newUser.password = await bcrypt.hash(password, 10);
		await newUser.save();

		res
			.status(201)
			.json({ message: "User created successfully", data: newUser });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Please enter email and password" });
	}

	try {
		const foundUser = await User.findOne({ email });
		if (!foundUser) {
			return res
				.status(404)
				.json({ message: "User does not exist. Kindly register" });
		}

		const isMatch = await bcrypt.compare(password, foundUser.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "Wrong password. Please try again." });
		}

		res.json({
			message: "Login successful",
			user: foundUser
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
