require('../config/db.config')
const mongoose = require("mongoose");
const themeSeeder = require("../seeder/theme.seed");
const seedCustomer = require("../seeder/customer.seed");



const seed = async () => {
    try {
        await themeSeeder();
        await seedCustomer();
        
    } catch (error) {
        console.log(`Error during seeding: ${err.stack}`);
    } finally {
        mongoose.disconnect();
        console.log('Seeding completed.');
    }
}

seed();