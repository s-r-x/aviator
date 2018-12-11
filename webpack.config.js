module.exports = {
  entry: './src/index.js',
  output: {
    library: 'Aviator',
    libraryTarget: 'umd',
    filename: 'Aviator.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  },
};
