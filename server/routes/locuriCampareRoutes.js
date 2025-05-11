const express = require("express");
const locuriCampareController = require("../controllers/locuriCampareController");

const router = express.Router();

router
  .route("/")
  .get(locuriCampareController.getAllLocuriCampare)
  .post(locuriCampareController.createLocuriCampare);

router
  .route("/get-total-number-of-spaces")
  .get(locuriCampareController.getTotalLocuriCampare);

router
  .route("/:id")
  .get(locuriCampareController.getLoc)
  .patch(locuriCampareController.updateLocCampare)
  .delete(locuriCampareController.deleteLocCampare);

module.exports = router;
