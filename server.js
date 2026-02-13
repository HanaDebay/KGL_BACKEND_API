require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const app = express();


app.use(cors());
app.use(express.json());

//use database connection
connectDB();






app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});