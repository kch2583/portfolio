const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fnlttSinglAcnts', {
    rcept_no: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    bsns_year: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    stock_code: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    reprt_code: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    account_nm: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    fs_div: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    fs_nm: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sj_div: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    sj_nm: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    thstrm_nm: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    thstrm_dt: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    thstrm_amount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    thstrm_add_amount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    frmtrm_nm: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    frmtrm_dt: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    frmtrm_amount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    frmtrm_add_amount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    bfefrmtrm_nm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    bfefrmtrm_dt: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    bfefrmtrm_amount: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ord: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fnlttSinglAcnts',
    timestamps: false,
    indexes: [
      {
        name: "rcept_no",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rcept_no" },
        ]
      },
    ]
  });
};
