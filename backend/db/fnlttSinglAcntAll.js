var mongoose = require("mongoose");
var FnlttSinglAcntSchema = new mongoose.Schema({
  rcept_no: String,
  reprt_code: String,
  bsns_year: String,
  corp_code: String,
  list: Array,
});
mongoose.model("FnlttSinglAcntAll", FnlttSinglAcntSchema);
module.exports = mongoose.model("FnlttSinglAcntAll");
