const router = require("express").Router();
const productController = require("../../config/controllers/ProductsController");

router.route("/api/product/")
    .get(productController.findAllProducts)
    .post(productController.createProduct);

router.route("/api/products/:id")
    .get(productController.findProductById)
    .put(productController.updateProduct)
    .delete(productController.removeProducts);

router.route("/api/products/subcategory/:id")
    .get(productController.getProductBySubCategory)
    
router.route("/api/products/hot")
    .get(productController.getHotProducts)
    
router.route("/api/products/new")
    .get(productController.getNewProducts)

module.exports = router;