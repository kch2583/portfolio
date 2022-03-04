const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "corpCode",
    {
      corp_name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      stock_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      modify_date: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      corp_code: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "corpCode",
      timestamps: false,
    }
  );
};
