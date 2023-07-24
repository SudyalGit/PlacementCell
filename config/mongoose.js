const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Nitish:nitish33@cluster0.ksobj.mongodb.net/PlacementCellDb?retryWrites=true&w=majority');
const db = mongoose.connection;


db.on("error", console.error.bind(console, "error in connecting the database"));
db.once("open", () => {
  console.log("succesfully connected to database");
});

module.exports = db;