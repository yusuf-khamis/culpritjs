const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'culpritjs.min.' + process.env.VERSION + '.js'
  }
}
