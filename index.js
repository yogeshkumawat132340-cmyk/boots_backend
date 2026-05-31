const express = require("express");
const cors = require("cors");

const connectDB = require("./connection");

const productRoutes = require("./routes/productRoutes");
const userRoutes= require("./routes/userRoutes")

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// 1. रूट्स को ऊपर कर दिया ताकि 404 एरर न आए
app.use("/pro", productRoutes); 
app.use("/post", userRoutes);   

// 2. डेटाबेस कनेक्शन को इसके नीचे रखा
connectDB();


app.get("/", (req, res) => {
  res.send("API running");
});


app.listen(PORT, () => {
  console.log("Server running on", PORT);
});