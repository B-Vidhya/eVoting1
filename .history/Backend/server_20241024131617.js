const express = require("express");
const app = express();
//const colors = require("colors");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT;
const colors = require("colors");
const userRoutes = require("./Routes/userRoutes");
const eventRoutes = require("./Routes/eventRoutes"); // Add this line
const nominationRoutes = require("./Routes/nominationRoutes");
const cors = require("cors");
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/user", userRoutes);
app.use("/api/events", eventRoutes); // Add this line
app.use("/api/events", nominationRoutes);
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`.yellow.bold);
});
