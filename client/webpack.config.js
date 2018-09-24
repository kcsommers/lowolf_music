module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|m4a|mp3)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}