const express = require("express");
const cors = require("cors");
require("./config/config");
require("dotenv").config();
const app = express();
const port = process.env.port;
// const route = require("./router/route");
app.use(express.json());

app.use(cors({
  origin: "*"
}));



// app.use("/", route);

app.get("/", (req, res) => {
  res.send("Welcome to tourHaven");
});

app.listen(port, () => {
  console.log(`server is up and running on ${port} `);
});
