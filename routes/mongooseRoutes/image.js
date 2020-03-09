const router = require("express").Router();
const imageController = require("../../config/controllers/ImageController")

router.route("api/image/")
    .get(imageController.getAllImages)
    .post(imageController.postImage);
router.route("api/image/:id")
    .get(imageController.findImagebyId)
    .delete(imageController.deleteImageById);
router.route("api/image/product/:id")
    .get(imageController.findImagesByProduct)
    .delete(imageController.deleteImagesByProduct);
router.route("api/image/transfer/:id")
    .get(imageController.findImagesByTransfer)
    .delete(imageController.deleteImagesByTransfer);