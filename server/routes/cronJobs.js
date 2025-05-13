const cron = require("node-cron");
const {
  actualizeazaRezervariExpirate,
} = require("../controllers/rezervareController");

cron.schedule(
  "0 0 * * *",
  async () => {
    try {
      await actualizeazaRezervariExpirate();
    } catch (err) {
      console.error("Eroare la actualizarea rezervărilor din cron job:", err);
    }
  },
  {
    scheduled: true,
    timezone: "Europe/Bucharest",
  }
);
