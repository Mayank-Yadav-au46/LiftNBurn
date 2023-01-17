const express = require("express");
const db_connect = require("./db_config");
const sample_router = require("./routes/router");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const { urlencoded } = require("express");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/user", sample_router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server started");
  db_connect();
});
