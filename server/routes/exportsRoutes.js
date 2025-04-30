const express = require("express");
const pdfsController = require("../pdfs/revenueRaport");

const router = express.Router();

router.route("/revenue-raport").get(pdfsController.RevenueRaport);

module.exports = router;
