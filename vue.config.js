const path = require("path");
module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  outputDir: "./backend/public",
};
