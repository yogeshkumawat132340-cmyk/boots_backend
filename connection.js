const mongoose = require("mongoose");

const connectDB = () => {

mongoose.connect(
  "mongodb+srv://yogeshkumawat132330_:r7rOFpXe5211Efqo@cluster0.cl90jda.mongodb.net/myAppDB?retryWrites=true&w=majority"
)
  .then(() => {
    console.log("MongoDB Connected");
  })

  .catch((error) => {
    console.log(error);
  });

};

module.exports = connectDB;