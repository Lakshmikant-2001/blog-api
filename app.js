const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8080;

mongoose.connect(DB_URL);
mongoose.connection.once("connected", () => {
  console.log("Connected to database");
});

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}...`);
});
