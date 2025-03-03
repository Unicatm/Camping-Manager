const mongoose = require("mongoose");

const locuriCampareSchema = new mongoose.Schema({
  _id: String,
  hasElectricity: {
    type: Boolean,
    default: false,
  },
  isDisponibil: {
    type: Boolean,
    default: true,
  },
});

const LocuriCampare = mongoose.model("LocuriCampare", locuriCampareSchema);

module.exports = LocuriCampare;
