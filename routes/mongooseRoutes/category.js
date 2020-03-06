const router = require("express").Router();
const categoryController = require("../../config/controllers/CategoryController");

router.route("/api/category")
    .get(categoryController.findAllCategories)
    .post(categoryController.createCategory);

router
    .route("/api/category/:id")
    .get(categoryController.findCategoryById)
    .put(categoryController.updateCategory)
    .delete(categoryController.removeCategory);

module.exports = router;