const express = require("express");
const revenueController = require("../pdfs/revenueRaport");
const clientPdfController = require("../pdfs/clientRaport");

const router = express.Router();

router.route("/revenue-raport").get(revenueController.RevenueRaport);
router.route("/client-raport/:id").get(clientPdfController.ClientRaport);

module.exports = router;
