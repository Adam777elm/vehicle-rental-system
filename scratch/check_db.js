const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env from backend dir
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const Vehicle = require('../backend/models/Vehicle');

async function checkAds() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        
        const vehicles = await Vehicle.find().sort({ createdAt: -1 }).limit(5);
        console.log("Last 5 vehicles:");
        console.log(JSON.stringify(vehicles, null, 2));
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkAds();
