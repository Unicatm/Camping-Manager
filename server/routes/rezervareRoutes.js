const express = require("express");
const rezervareController = require("../controllers/rezervareController");

const router = express.Router();

router
  .route("/")
  .get(rezervareController.getAllRezervari)
  .post(rezervareController.createRezervare);

router
  .route("/:id")
  .get(rezervareController.getRezervare)
  .patch(rezervareController.updateRezervare)
  .delete(rezervareController.deleteRezervare);

router.route("/clienti/:cnp").get(rezervareController.getRezervariByClientId)

module.exports = router;
