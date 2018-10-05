const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
          // store a file
    cb(null, true);
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage, 
    limits: { fileSize: 1024 * 1024 * 15 // 5 Mb 
    },
    fileFilter:  fileFilter
});

const Product = require('../models/product');

router.get('/', ProductsController.products_get_all)
router.post('/', checkAuth, upload.single('productImage'), ProductsController.product_create_product)
router.get('/:productId', ProductsController.product_get_product)
router.patch('/:productId', checkAuth, ProductsController.product_update_product)
router.delete('/:productId', checkAuth, ProductsController.products_delete_product)

module.exports = router;

