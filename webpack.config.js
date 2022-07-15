const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, 'src', 'main.js'),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  devServer: {
    port: 3000,
  },
};
