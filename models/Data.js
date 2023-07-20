const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
	dateTime: {
		type: Date,
		required: true
	},
	meterNumber: {
		type: String,
		required: true
	},
	voltage: {
		type: Number,
		required: true
	},
	current: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model("Data", dataSchema);
