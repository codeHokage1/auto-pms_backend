const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectDB = require("./config/dbConfig");

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const dataRoutes = require("./routes/dataRoutes");

app.get("/api/v1", (req, res) => {
	res.send("Welcome to Auto PMS - by Group 1");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/data", dataRoutes);

const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
