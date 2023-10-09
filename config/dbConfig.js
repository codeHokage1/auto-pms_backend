const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    try {
        // await mongoose.connect(
        //     process.env.MONGO_URI
        //     // {
        //     //     useNewUrlParser: true,
        //     //     useUnifiedTopology: true,
        //     // }
        // )
        // console.log("Connected to MongoDB!");

        mongoose.connect(process.env.MONGO_URI);
		mongoose.connection.on("connected", () => {
			console.log("MongoDB is connected!");
		});
		mongoose.connection.on("error", (error) => {
			console.log("MongoDB is not connected!");
			return error;
		});
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;

