const path = require('path');

module.exports = {
  entry: './client/src/engine/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true
};