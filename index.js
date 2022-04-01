const admin = require("firebase-admin");
const express = require("express");
var cors = require("cors");
const db = require("./firebase");
const { collection, query, onSnapshot } = require("firebase/firestore");
const myRoutes = require("./myRoutes");
const app = express();

// middleware
app.use(express.json());

app.use(cors());
app.use(myRoutes);
app.listen(5000, () => {
  console.log("SERVER IS UP AND RUNNING");
});
