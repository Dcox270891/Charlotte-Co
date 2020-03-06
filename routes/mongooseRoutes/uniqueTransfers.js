const router = require("express").Router();
const uniqueTransfersController = require("../../config/controllers/uniqueTransfersController");

router.route("/api/uniquetransfers/")
    .get(uniqueTransfersController.findAllUniqueTransfers)
    .post(uniqueTransfersController.createUniqueTransfer);

router
    .route("/api/uniquetransfers/:id")
    .get(uniqueTransfersController.findUniqueTransferById)
    .put(uniqueTransfersController.updateUniqueTransfer)
    .delete(uniqueTransfersController.removeUniqueTransfer);

module.exports = router;