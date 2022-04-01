const express = require("express");
var cors = require("cors");
const myRoutes = require("./myRoutes");
const app = express();
const port = process.env.PORT || 4000;

// middleware

app.use(cors());
app.use(express.json());

app.use(myRoutes);
app.listen(port, () => {
  console.log("SERVER IS UP AND RUNNING" + port);
});
