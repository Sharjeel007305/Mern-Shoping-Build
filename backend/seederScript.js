const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const productsData = require('./data/products');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const { ConnectionStates } = require('mongoose');

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany({});
    
        await Product.insertMany(productsData)

        console.log("Data Import Success");

        process.exit();
    } catch (error) {
        console.error("Error with data import");
        process.exit(1)
    }

}

importData();