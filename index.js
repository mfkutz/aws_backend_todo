require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const mongoose = require("mongoose");
const cors = require("cors");

//ROUTE IMPORTS
const todoRoutes = require("./routes/todo");

//APP SETTINGS
app.use(express.json());
const PORT = process.env.PORT || 5050;
app.use(cors());

app.use("/healthcheck", (req, res) => {
  res.status(200).send("ok");
});

app.use("/api/todo", todoRoutes);

app.use((req, res) => {
  res.status(200).send("URL no encontrada");
});
//APP initialization
connectDB();
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
//APP connection error
mongoose.connection.on("error", (error) => {
  console.log("Error connecting to db: ", error);
});
