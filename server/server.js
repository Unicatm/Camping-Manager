const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const authRoutes = require("./routes/authRoutes");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connection successfull!"));

require("./routes/cronJobs");

app.use("/api/v1/auth", authRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
