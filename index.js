const express = require("express");
var cors = require("cors");
const myRoutes = require("./myRoutes");
const app = express();

// middleware

app.use(cors());
app.use(express.json());

app.use(myRoutes);
app.listen(5000, () => {
  console.log("SERVER IS UP AND RUNNING");
});
