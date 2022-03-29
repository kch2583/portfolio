var mongoose = require("mongoose");

var BodyWeightScheme = new mongoose.Schema({
  date: Date,
  weight: Number,
});
mongoose.model("BodyWeight", BodyWeightScheme);
module.exports = mongoose.model("BodyWeight");
