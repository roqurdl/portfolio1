const path = require("path");

module.exports = {
  entry: "./src/public/js/main.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist", "js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { target: "defaults" }]],
          },
        },
      },
    ],
  },
};
