const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

const getAllProducts = async(req,res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1, _id: -1 });
        res.json(products)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
}

const getProductsById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
        
    }

}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, countInStock, imageUrl } = req.body;

        if (!name || !description || price === undefined || price === "" || countInStock === undefined || countInStock === "") {
            return res.status(400).json({ message: "Please fill in all product fields." });
        }

        const resolvedImageUrl = req.file
            ? `/uploads/${req.file.filename}`
            : (imageUrl || "").trim();

        if (!resolvedImageUrl) {
            return res.status(400).json({ message: "Please provide an image URL or upload an image." });
        }

        const product = await Product.create({
            name: name.trim(),
            description: description.trim(),
            price: String(price),
            countInStock: Number(countInStock),
            imageUrl: resolvedImageUrl,
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.imageUrl && product.imageUrl.startsWith("/uploads/")) {
            const imagePath = path.join(__dirname, "..", product.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await product.deleteOne();
        res.json({ message: "Product removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getAllProducts,
    getProductsById,
    createProduct,
    deleteProduct,
};