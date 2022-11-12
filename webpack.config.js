const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/public/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    productCommentSection: BASE_JS + "productCommentSection.js",
    liveCommentSection: BASE_JS + "liveCommentSection.js",
  },
  mode: "development",
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  watch: true,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
