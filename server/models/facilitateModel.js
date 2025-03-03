const mongoose = require("mongoose");

const facilitateSchema = new mongoose.Schema({
  denumire: {
    type: String,
    required: true,
  },
  pret: {
    type: Number,
    required: true,
  },
});

const Facilitate = mongoose.mongoose.model("Facilitate", facilitateSchema);

module.exports = Facilitate;
