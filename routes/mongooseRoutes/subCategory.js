const router = require("express").Router();
const subCategoryController = require("../../config/controllers/SubCategoryController");

router.route("/api/subcategory/")
    .get(subCategoryController.findAllSubCategories)
    .post(subCategoryController.createSubCategory);

router
    .route("/api/subcategory/:id")
    .get(subCategoryController.findSubCategoryById)
    .put(subCategoryController.updateSubCategory)
    .delete(subCategoryController.removeSubCategory);
router
    .route("/api/subcategory/category/:id")
    .get(subCategoryController.findSubCategoryByCategory);

module.exports = router;