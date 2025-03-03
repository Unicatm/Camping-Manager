const express = require("express");
const facilitateController = require("../controllers/facilitateControler");

const router = express.Router();

router
  .route("/")
  .get(facilitateController.getAllFacilitati)
  .post(facilitateController.createFacilitate);

router
  .route("/:id")
  .get(facilitateController.getFacilitate)
  .patch(facilitateController.updateFacilitate)
  .delete(facilitateController.deleteFacilitate);

module.exports = router;
