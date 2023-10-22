require("dotenv").config();
const express = require("express");
const { ConnectDB } = require("./database");
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require("./router/auth");
// database connections
ConnectDB();

// middleware
app.use(
  express.json({
    urlencoded: true,
  })
);

//routes
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => console.log("Connect to port " + PORT));
