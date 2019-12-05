const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, './')
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                'main.*.js',
                'precache-manifest.*.js'
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new GenerateSW({
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp(''),
                    handler: 'NetworkFirst'
                }
            ]
        })
    ],
    watch: true,
    devServer: {
        overlay: true,
        writeToDisk: true,
        stats: 'minimal'
    }
};
