let webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(|m4a|mp3)$/i,
        loader: 'file-loader'
      }
    ]
  }
}