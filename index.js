const express = require("express");
require("./automates/reservation.automate.js");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middlewares/jwt.middleware.js");

const Product = require("./routes/product.route.js");
const User = require("./routes/user.route.js");
const reservation = require("./routes/reserve.route.js");
const Order = require("./routes/order.route.js");
const auth = require("./routes/auth.route.js");
const dashboard = require("./routes/dashboard.route.js");
const History = require("./routes/history.route.js");

const cors = require("cors");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.100.35:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Your routes should come after this middleware

app.use("/", auth);
app.use("/", verifyToken, dashboard);
app.use("/", verifyToken, Product);
app.use("/", verifyToken, User);
app.use("/", verifyToken, reservation);
app.use("/", verifyToken, Order);
app.use("/", verifyToken, History);
mongoose
  .connect(
    "mongodb+srv://asifdhillon25:assa2531@mymongo.tykkbty.mongodb.net/nabeel?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch(() => {
    console.log("connected to database failed");
  });
