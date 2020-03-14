const router = require("express").Router();
const productController = require("../../config/controllers/ProductsController");

router.route("/api/product/")
    .get(productController.findAllProducts)
    .post(productController.createProduct);

router.route("/api/products/:id")
    .get(productController.findProductById)
    .put(productController.updateProduct)
    .delete(productController.removeProducts);
router.route("api/products/subcategory/:id")
    .get(productController.getProductBySubCategory)

module.exports = router;