const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('webpack');
const webpack = require ('webpack')
const autoprefixer = require('autoprefixer');

module.exports = (env) => { 
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src' , 'main.js'),
            output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader'
                },
              {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
              },
            ],
          },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'src', 'index.html' )}),
            new webpack.ProgressPlugin(),
        ],
        devServer: {
            static: {
              directory: path.join(__dirname, 'src'),
            },
            compress: true,
            port: 9000,
         }
    } 
};
