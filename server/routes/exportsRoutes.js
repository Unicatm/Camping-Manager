const express = require("express");
const revenueController = require("../pdfs/revenueRaport");
const clientPdfController = require("../pdfs/clientRaport");
const priceListController = require("../pdfs/priceList");

const router = express.Router();

router.route("/revenue-raport").get(revenueController.RevenueRaport);
router.route("/price-list").get(priceListController.PriceListExport);
router.route("/client-raport/:id").get(clientPdfController.ClientRaport);

module.exports = router;
