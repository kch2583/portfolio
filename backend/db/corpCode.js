var mongoose = require("mongoose");
var CorpCodeSchema = new mongoose.Schema({
  corp_name: String,
  stock_code: String,
  modify_date: String,
  corp_code: String,
});
mongoose.model("CorpCode", CorpCodeSchema);
module.exports = mongoose.model("CorpCode");
