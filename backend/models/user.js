const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_i_d: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "user_i_d"
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_i_d",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_i_d" },
        ]
      },
    ]
  });
};
