const express = require("express");
// const morgan = require("morgan");

const clientRouter = require("./routes/clientRoutes");
const rezervariRouter = require("./routes/rezervareRoutes");
const locuriCampareRouter = require("./routes/locuriCampareRoutes");
const facilitatiRouter = require("./routes/facilitatiRoutes");

const app = express();

// app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/rezervari", rezervariRouter);
app.use("/api/v1/locuriCampare", locuriCampareRouter);
app.use("/api/v1/facilitati", facilitatiRouter);

module.exports = app;
