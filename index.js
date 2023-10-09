const express = require("express");
require("dotenv").config();
const cors = require("cors");

const mongoDBConfig = require("./config/dbConfig");

// const { initializeApp } = require("firebase/app");
// const { getDatabase, ref, onValue } = require("firebase/database");

// const firebaseConfig = {
// 	databaseURL: "https://power-management-c9fa4-default-rtdb.firebaseio.com/"
// };

const app = express();

// let database;
// try {
// 	// Initialize Firebase
// 	const firebaseApp = initializeApp(firebaseConfig);

// 	// Initialize Realtime Database and get a reference to the service
// 	database = getDatabase(firebaseApp);
// 	console.log("Connected to DB!");
// } catch (error) {
// 	console.log(error);
// }



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const dataRoutes = require("./routes/dataRoutes");

app.get("/api/v1", (req, res) => {
	res.send("Welcome to Auto PMS - by Group 1");
});

// app.get("/apartmentA", async (req, res) => {
// 	try {
// 		const atsRef = ref(database, "APARTMENT A/");
// 		onValue(atsRef, (snapshot) => {
// 			const data = snapshot.val();

// 			res.json({
// 				message: "Gotten data!",
// 				data
// 			});
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: error.message, data: null });
// 	}
// });

// app.get("/apartmentB", async (req, res) => {
// 	try {
// 		const atsRef = ref(database, "APARTMENT B/");
// 		onValue(atsRef, (snapshot) => {
// 			const data = snapshot.val();

// 			res.json({
// 				message: "Gotten data!",
// 				data
// 			});
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: error.message, data: null });
// 	}
// });


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/data", dataRoutes);

const PORT = process.env.PORT || 3000;
mongoDBConfig();
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});

// module.exports = {
// 	database
// }
