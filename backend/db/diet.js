var mongoose = require("mongoose");

var DietScheme = new mongoose.Schema({
  date: Date,
  breakfast: String,
  brunch: String,
  lunch: String,
  linner: String,
  dinner: String,
  lateNightMeal: String,
  snack: String,
  supplement: String,
});
mongoose.model("Diet", DietScheme);
module.exports = mongoose.model("Diet");
