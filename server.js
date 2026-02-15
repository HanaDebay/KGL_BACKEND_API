require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const procurementRoutes = require("./routes/procurmentRoutes.js");
const salesRoutes = require("./routes/salesRoutes.js");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger.js");


const app = express();


app.use(cors());
app.use(express.json());

//use database connection
connectDB();

app.use("/users", userRoutes);
app.use("/procurements", procurementRoutes);
app.use("/sales", salesRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});