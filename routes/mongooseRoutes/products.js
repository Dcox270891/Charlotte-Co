const router = require("express").Router();
const categoryController = require("../../config/controllers/ProductsController");

router.route("/api/products/")
    .get(categoryController.findAllProducts)
    .post(categoryController.createProduct);

router.route("/api/products/:id")
    .get(categoryController.findProductById)
    .put(categoryController.updateProduct)
    .delete(categoryController.removeProducts);

module.exports = router;