const mongoose = require("mongoose");
const { numbersRegex } = require("../../client/src/utils/regex");

const rezervareSchema = new mongoose.Schema({
  idClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  idLoc: {
    type: String,
    ref: "LocuriCampare",
  },
  dataCheckIn: {
    type: Date,
    required: true,
  },
  dataCheckOut: {
    type: Date,
    required: true,
  },
  hasElectricity: {
    type: Boolean,
    required: true,
    default: false,
  },
  tipAuto: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ["În curs", "Terminată"],
    default: "În curs",
  },
  facilitati: {
    type: Object,
    required: true,
  },
  suma: {
    type: Number,
  },
  sumaPerDay: {
    type: Number,
  },
  numeClient: {
    type: String,
  },
});

async function calculeazaSume(querry) {
  const costElectricitate = querry.hasElectricity ? 0 : -10;

  let costFacilitati = 0;
  if (querry.facilitati) {
    for (const [key, value] of [...Object.entries(querry.facilitati)]) {
      const facilitate = await mongoose
        .model("Facilitate")
        .findOne({ denumire: key });
      if (facilitate && typeof facilitate.pret === "number") {
        costFacilitati += value * facilitate.pret;
      }
    }
  }

  if (querry.tipAuto) {
    for (const [key, value] of [...Object.entries(querry.tipAuto)]) {
      const tipAuto = await mongoose
        .model("Facilitate")
        .findOne({ denumire: key });
      if (tipAuto && typeof tipAuto.pret === "number") {
        costFacilitati += value * tipAuto.pret;
      }
    }
  }

  const sumaPerDay = costElectricitate + costFacilitati;

  const numarZile = Math.ceil(
    (querry.dataCheckOut - querry.dataCheckIn) / (1000 * 60 * 60 * 24)
  );

  const suma = sumaPerDay * numarZile;

  return {
    sumaPerDay: isNaN(sumaPerDay) ? 0 : sumaPerDay,
    suma: isNaN(suma) ? 0 : suma,
  };
}

rezervareSchema.pre("save", async function (next) {
  const { sumaPerDay, suma } = await calculeazaSume(this);
  this.sumaPerDay = sumaPerDay;
  this.suma = suma;
  next();
});

rezervareSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const update = this.getUpdate();

  const querryToUpdate = await this.model.findOne(query);

  if (!update.$set) {
    update.$set = { ...update };
  }

  querryToUpdate.set(update.$set);

  const { sumaPerDay, suma } = await calculeazaSume(querryToUpdate);
  console.log("SUME");
  console.log("Suma " + suma);
  console.log("Suma per day " + sumaPerDay);

  update.$set.suma = suma;
  update.$set.sumaPerDay = sumaPerDay;
  next();
});

const Rezervare = mongoose.model("Rezervare", rezervareSchema);

module.exports = Rezervare;
