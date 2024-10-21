require('dotenv').config({ path : "../.env"});  

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const dbUrl = process.env.ATLASDB_URL;

console.log('MongoDB URI:', dbUrl);  

main()
    .then(() => {
        console.log("Connected to MongoDB");
        initDB(); 
    })
    .catch(err => console.error("Error connecting to MongoDB:", err));

async function main() {
    await mongoose.connect(dbUrl);  
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj, owner: "6715e6207d3c6a092b90d546" }));
        await Listing.insertMany(initData.data);
        console.log("Data was initialized");
    } catch (error) {
        console.error("Error initializing data:", error);
    }
};
