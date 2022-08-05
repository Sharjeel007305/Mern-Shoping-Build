const { response } = require('express');
const Product = require('../models/Product');

const getAllProducts = async(req,res) => {
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
}



const getProductsById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log(product,"--------------------------")
        res.status(201).json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
        
    }

}

module.exports = {
    getAllProducts,
    getProductsById
};