module.exports = {
  module: {
    rules: [
      {
        test: /\.mp3$/,
        loader: 'url-loader'
      }
    ]
  }
}
