module.exports = {
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
  configureWebpack: {
    module: {
      rules: [{ test: /\.MOV/, use: "raw-loader" }],
    },
  },

  devServer: {
    historyApiFallback: true,
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
