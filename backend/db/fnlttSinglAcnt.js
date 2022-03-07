var mongoose = require("mongoose");
var FnlttSinglAcntSchema = new mongoose.Schema({
  rcept_no: String,
  bsns_year: String,
  stock_code: String,
  reprt_code: String,
  thstrm_nm: String, // 당기명
  thstrm_dt: String, // 당기 일자
  current_asset: String, //유동자산
  non_current_asset: String, // 비유동자산
  total_assets: String, // 자산 총계
  current_liabilities: String, //유동부채
  non_current_liabilities: String, //비유동부채
  total_liabilities: String, //부채총계
  capital_stock: String, // 자본금
  retained_earning: String, //이익잉여금
  total_stockholders_equity: String, // 자본총계
  sales: String, //매출액
  operating_income: String, //영업이익
  income_before_income_tax_expenses: String, //법인세차감전 순이익
  net_income: String, //당기순이익
});
mongoose.model("FnlttSinglAcnt", FnlttSinglAcntSchema);
module.exports = mongoose.model("FnlttSinglAcnt");
