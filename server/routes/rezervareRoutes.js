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
  .route("/incoming-revenue-years")
  .get(rezervareController.getIncomingRevenueOnSelectedYears);

router
  .route("/checkout-viitoare")
  .get(rezervareController.getRezervariCuCheckoutInUrmatoareleDouaZile);

router.route("/age-grouping/:year").get(rezervareController.getAgeGroups);

router
  .route("/total-number-of-reservations")
  .get(rezervareController.getTotalNumberOfReservations);

router
  .route("/total-number-of-active-reservations")
  .get(rezervareController.getTotalNumberOfActiveReservations);

router
  .route("/get-current-year-revenue")
  .get(rezervareController.getCurrentYearRevenue);

router.route("/average-days").get(rezervareController.getAvarageDaysSpent);

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
router
  .route("/clienti/expenses/:idClient")
  .get(rezervareController.getExpensesByClientId);

module.exports = router;
