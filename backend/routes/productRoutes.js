const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const { getAllProducts, getProductsById, createProduct, deleteProduct } = require('../controller/productControllers')

//@desc GET all products from db
//@route GET /api/products
//@access Pubilc
router.get('/', getAllProducts )

//@desc CREATE a product
//@route POST /api/products
//@access Pubilc
router.post('/', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'Image upload failed.' });
    }
    next();
  });
}, createProduct)

//@desc GET a products by id from db
//@route GET /api/products/:id
//@access Pubilc
router.get('/:id', getProductsById)

//@desc DELETE a product by id
//@route DELETE /api/products/:id
//@access Pubilc
router.delete('/:id', deleteProduct)



module.exports = router;