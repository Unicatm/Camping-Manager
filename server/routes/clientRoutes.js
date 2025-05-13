const express = require("express");
const clientController = require("../controllers/clientController");

const router = express.Router();

router
  .route("/")
  .get(clientController.getAllClients)
  .post(clientController.createClient);

router.route("/clients-name-cnp").get(clientController.getClientsNameAndCnp);

router
  .route("/:id")
  .get(clientController.getClient)
  .patch(clientController.updateClient)
  .delete(clientController.deleteClient);

router
  .route("/rezervari/:clientId")
  .get(clientController.getClientWithReservations);

router
  .route("/stats/client-growth-data")
  .get(clientController.getClientGrowthData);
router
  .route("/stats/weekly-new-data")
  .get(clientController.getWeeklyNewClientsStats);

  

module.exports = router;
