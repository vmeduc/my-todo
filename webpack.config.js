module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  
  devServer: {
    port: 3000,
  },


}