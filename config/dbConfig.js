const { initializeApp } = require("firebase/app");
const { getDatabase, ref, onValue } = require("firebase/database");

const firebaseConfig = {
	databaseURL: "https://power-management-c9fa4-default-rtdb.firebaseio.com/"
};

let database;
const configDB = async() => {
    try {
        // Initialize Firebase
        const firebaseApp = initializeApp(firebaseConfig);
    
        // Initialize Realtime Database and get a reference to the service
        database = getDatabase(firebaseApp);
        console.log("Connected to DB!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    database, configDB
}





// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(
//             process.env.MONGO_URI,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             }
//         )
//         console.log("Connected to DB");
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = connectDB;

