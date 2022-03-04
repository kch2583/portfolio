"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable("corpCode", {
      corp_name: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      stock_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      modify_date: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      corp_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
