const Data = require("../models/Data");
const User = require("../models/User");

exports.getAllData = async (req, res) => {
	try {
		const data = await Data.find();
		res.json({ data: data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

exports.getDataByMeter = async (req, res) => {
	try {
		// find meter
		const existingMeter = await Data.find({ meterNumber: req.params.meterNo });
		if (!existingMeter.length) {
			return res.status(404).json({
				error: `Meter Number: ${req.params.meterNo} has no data yet.`
			});
		}

		res.json({ data: existingMeter });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

exports.addData = async (req, res) => {
	const { dateTime, meterNumber, voltage, current } = req.body;
	if (!dateTime || !meterNumber || !voltage || !current) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	try {
		// find meter
		const foundMeter = await User.find({ meterNumber: req.params.meterNo });
		if (!foundMeter.length)
			return res.status(404).json({ error: "Meter not registered" });

		const newData = await Data.create(req.body);
		res.status(201).json({ message: "Data added successfully", data: newData });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
