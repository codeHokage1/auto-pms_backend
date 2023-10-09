const Data = require("../models/Data");
const User = require("../models/User");

// const database = require("../index").database;
// const { getDatabase, ref, onValue } = require("firebase/database");

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue } = require("firebase/database");

const firebaseConfig = {
	databaseURL: "https://power-management-c9fa4-default-rtdb.firebaseio.com/"
};

let database;
try {
	// Initialize Firebase
	const firebaseApp = initializeApp(firebaseConfig);

	// Initialize Realtime Database and get a reference to the service
	database = getDatabase(firebaseApp);
	console.log("Connected to Firebase DB!");
} catch (error) {
	console.log(error);
}

exports.getAllData = async (req, res) => {
	try {
		const fullData = [];
		const atsRef = ref(database, "ATS/");
		await onValue(atsRef, (snapshot) => {
			const data = snapshot.val();
			fullData.push({ ats: data });
		});

		const aprtARef = ref(database, "APARTMENT A/");
		await onValue(aprtARef, (snapshot) => {
			const data = snapshot.val();
			fullData.push({ apartmentA: data });
		});

		const aprtBRef = ref(database, "APARTMENT B/");
		await onValue(aprtBRef, (snapshot) => {
			const data = snapshot.val();
			fullData.push({ apartmentB: data });
		});

		return res.json({
			message: "All data!",
			data: fullData
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};

exports.getDataByMeter = async (req, res) => {
	try {
		// find meter
		const meterNo = req.params.meterNo;
		console.log(meterNo);
		// if (meterNo !== "A100" || meterNo !== "A200") {
		// 	return res.json({
		// 		message: "Meter not recognized",
		// 		data: null
		// 	});
		// }

		if (meterNo === "A100") {
			const aprtARef = ref(database, "APARTMENT A/");
			await onValue(aprtARef, (snapshot) => {
				const data = snapshot.val();
				return res.json({
					message: "Apartment A Data",
					info: [{
						meterNo: "A100",
						units: 100,
						...data
					}]
				});
			});
		} else if (meterNo === "A200") {
			const aprtARef = ref(database, "APARTMENT B/");
			await onValue(aprtARef, (snapshot) => {
				const data = snapshot.val();
				return res.json({
					message: "Apartment B Data",
					info: [{
						meterNo: "A200",
						units: 100,
						...data
					}]
				});
			});
		} else {
			return res.json({
				message: "Meter not recognized",
				data: null
			});
		}

		// const existingMeter = await Data.find({ meterNumber: req.params.meterNo });
		// if (!existingMeter.length) {
		// 	return res.status(404).json({
		// 		error: `Meter Number: ${req.params.meterNo} has no data yet.`
		// 	});
		// }

		// res.json({ data: existingMeter });
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
		if (!foundMeter.length) return res.status(404).json({ error: "Meter not registered" });

		const newData = await Data.create(req.body);
		res.status(201).json({ message: "Data added successfully", data: newData });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
