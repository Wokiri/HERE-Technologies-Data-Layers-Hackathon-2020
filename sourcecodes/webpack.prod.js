const path = require('path')
const common = require("./webpack.common")
const { merge } = require("webpack-merge")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'prod'),
        filename: 'jsFiles/[name].[contentHash].js'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, //Extracts css into files
                    'css-loader' //Tuns css into common js
                ]
            },
            {
                //transpiles SCSS to js
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader, //Extract css into files
                    'css-loader', //Turns css into common js
                    'sass-loader' //Turns scss into css
                ]
            }
        ]
    },
    plugins: [

        new CleanWebpackPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true, // false for Vue SSR to find app placeholder
                removeEmptyAttributes: true,
            }
        })

    ]
})