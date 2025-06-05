const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const clientRouter = require("./routes/clientRoutes");
const rezervariRouter = require("./routes/rezervareRoutes");
const locuriCampareRouter = require("./routes/locuriCampareRoutes");
const facilitatiRouter = require("./routes/facilitatiRoutes");
const exportsRouter = require("./routes/exportsRoutes");
const authRouter = require("./routes/authRoutes");
const verifyAccessToken = require("./middlewares/verifyAccessToken");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/rezervari", rezervariRouter);
app.use("/api/v1/locuriCampare", locuriCampareRouter);
app.use("/api/v1/facilitati", facilitatiRouter);
app.use("/api/v1/exports", exportsRouter);

module.exports = app;
