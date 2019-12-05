const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/engine/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['main.*.js']
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    })
  ],
  watch: true,
  devServer: {
    overlay: true,
    writeToDisk: true,
    stats: 'minimal'
}
};
