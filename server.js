const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")));

mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  time: String
});

const Reservation = mongoose.model("Reservation", reservationSchema);

app.post("/reserve", async (req, res) => {

  try {

    const reservation = new Reservation(req.body);

    await reservation.save();

    res.json({
      message: "Reservation Saved Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error Saving Reservation"
    });

  }

});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "t3.html"));
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});