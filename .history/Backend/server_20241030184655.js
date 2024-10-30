const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT;
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes");
const eventRoutes = require("./Routes/eventRoutes");
const nominationRoutes = require("./Routes/nominationRoutes");
const resultRoutes = require("./Routes/resultRoutes"); // Import result routes

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/nominations", nominationRoutes);
app.use("/api/results", resultRoutes); // Add result routes

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`.yellow.bold);
});
