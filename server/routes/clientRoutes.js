const express = require("express");
const clientController = require("../controllers/clientController");

const router = express.Router();

router
  .route("/")
  .get(clientController.getAllClients)
  .post(clientController.createClient);

router.route("/client-growth-data").get(clientController.getClientGrowthData);
router.route("/clients-name-cnp").get(clientController.getClientsNameAndCnp);

router
  .route("/:id")
  .get(clientController.getClient)
  .patch(clientController.updateClient)
  .delete(clientController.deleteClient);

router
  .route("/rezervari/:clientId")
  .get(clientController.getClientWithReservations);

module.exports = router;
