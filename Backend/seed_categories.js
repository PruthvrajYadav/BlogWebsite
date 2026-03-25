const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Category = require(path.join(__dirname, 'Model', 'category'));

const defaultCategories = [
    { name: 'Design', count: 12 },
    { name: 'Tech', count: 45 },
    { name: 'Startup', count: 28 },
    { name: 'Lifestyle', count: 15 },
    { name: 'AI', count: 32 },
    { name: 'Coding', count: 56 }
];

async function seedCategories() {
    try {
        if (!process.env.DB) {
            throw new Error("DB connection string not found in .env");
        }
        await mongoose.connect(process.env.DB);
        console.log("Connected to DB for seeding...");

        await Category.deleteMany({});
        await Category.insertMany(defaultCategories);
        console.log("Successfully seeded default categories!");
        
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err.message);
        process.exit(1);
    }
}

seedCategories();
