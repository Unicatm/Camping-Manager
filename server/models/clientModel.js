const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  cnp: {
    type: String,
    unique: true,
  },
  nume: {
    type: String,
    required: [true, "A client must have a name"],
  },
  nrTelefon: String,
  email: String,
  nationalitate: String,
  dataNasterii: Date,
});

clientSchema.set("timestamps", true);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
