const express = require("express");
const cors = require("cors");
const app = express();
const Router = require("./route/router");
const env = require("dotenv");
require("./config/db");
env.config();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use("/api", Router);

app.use("/api/img", express.static("./public/upload"));

app.listen(PORT, () => {
  console.log("server is runing : " + PORT);
});
