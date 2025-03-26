const express = require("express");
const rezervareController = require("../controllers/rezervareController");

const router = express.Router();

router
  .route("/")
  .get(rezervareController.getAllRezervari)
  .post(rezervareController.createRezervare);

router.route("/years").get(rezervareController.getAllAvailableYears);
router
  .route("/number-reservations")
  .get(rezervareController.getMonthlyReservationsOnSelectedYears);

router
  .route("/:id")
  .get(rezervareController.getRezervare)
  .patch(rezervareController.updateRezervare)
  .delete(rezervareController.deleteRezervare);

router
  .route("/predominant-nationalities/:year")
  .get(rezervareController.getTopPredominantNationalitiesByYear);

router
  .route("/clienti/:idClient")
  .get(rezervareController.getRezervariByClientId);

module.exports = router;
