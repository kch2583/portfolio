var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _corpCode = require("./corpCode");
var _fnlttSinglAcnt = require("./fnlttSinglAcnt");
var _fnlttSinglAcnts = require("./fnlttSinglAcnts");
var _user = require("./user");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var corpCode = _corpCode(sequelize, DataTypes);
  var fnlttSinglAcnt = _fnlttSinglAcnt(sequelize, DataTypes);
  var fnlttSinglAcnts = _fnlttSinglAcnts(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    SequelizeMeta,
    corpCode,
    fnlttSinglAcnt,
    fnlttSinglAcnts,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
