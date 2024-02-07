const express = require("express");
const cors = require("cors");
require("./config/config");
require("dotenv").config();
const app = express();
const port = process.env.port;
// const route = require("./router/route");

// Enable CORS for all routes
app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"], // Add the allowed methods here
    })
  );



// app.use("/", route);

app.get("/", (req, res) => {
  res.send("Welcome to tourHaven");
});

app.listen(port, () => {
  console.log(`server is up and running on ${port} `);
});
