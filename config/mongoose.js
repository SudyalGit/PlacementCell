const mongoose = require("mongoose");

//connecting to the database
mongoose.connect(
  'mongodb+srv://placement:1UbhMXi13RXuCwSn@cluster0.p5gbb.mongodb.net/myDBplacementcell?retryWrites=true&w=majority'
);

// acquiring the connection to check if it is succesfull
const db = mongoose.connection;

// checking for the error
db.on("error", console.error.bind(console, "error in connecting the database"));

// up and running then print the statement
db.once("open", () => {
  console.log("database connected succesfully!!");
});

// exporting the connection
module.exports = db;