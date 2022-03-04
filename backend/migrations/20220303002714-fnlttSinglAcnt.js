"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("fnlttSinglAcnts", {
      // 접수번호
      rcept_no: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      //사업 연도
      bsns_year: {
        type: Sequelize.STRING(4),
        allowNull: true,
      },
      // 종목 코드
      stock_code: {
        type: Sequelize.STRING(6),
        allowNull: true,
      },
      // 보고서 코드
      reprt_code: {
        type: Sequelize.STRING(5),
      },

      // 계정명
      account_nm: {
        type: Sequelize.STRING(40),
      },
      // 개별/연결 구분
      fs_div: {
        type: Sequelize.STRING(3),
      },

      // 개별/연결명
      fs_nm: {
        type: Sequelize.STRING(20),
      },
      //재무제표 구분
      sj_div: {
        type: Sequelize.STRING(2),
      },
      //재무제표명
      sj_nm: {
        type: Sequelize.STRING(20),
      },
      // 당기명
      thstrm_nm: {
        type: Sequelize.STRING(30),
      },
      //당기일자
      thstrm_dt: {
        type: Sequelize.STRING(30),
      },
      //당기 금액
      thstrm_amount: {
        type: Sequelize.STRING(50),
      },
      //당기누적금액
      thstrm_add_amount: {
        type: Sequelize.STRING(50),
      },
      //전기명
      frmtrm_nm: {
        type: Sequelize.STRING(30),
      },

      // 전기일자
      frmtrm_dt: {
        type: Sequelize.STRING(40),
      },
      //전기금액
      frmtrm_amount: {
        type: Sequelize.STRING(50),
      },
      //전기 누적금액
      frmtrm_add_amount: {
        type: Sequelize.STRING(50),
      },
      //전전기명
      bfefrmtrm_nm: {
        type: Sequelize.STRING(50),
      },
      //전전기일자
      bfefrmtrm_dt: {
        type: Sequelize.STRING(50),
      },
      //전전기금액
      bfefrmtrm_amount: {
        type: Sequelize.STRING(50),
      },
      //계정과목 정렬 순서
      ord: {
        type: Sequelize.STRING(30),
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
    return queryInterface.dropTable("fnlttSinglAcnt2");
  },
};
