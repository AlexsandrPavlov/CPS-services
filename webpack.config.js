const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('webpack');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loader = require('sass-loader');

module.exports = (env) => {
	return {
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src', 'main.js'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			clean: true
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
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										require('postcss-preset-env'),
										autoprefixer({
											overrideBrowserslist: ['ie >= 8', 'last 4 version']
										})
									]
								}
							}
						},
						'resolve-url-loader',
						{ loader: 'sass-loader', options: { sourceMap: true } }
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'src', 'index.html')
			}),
			new webpack.ProgressPlugin(),
			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].css'
			})
		],
		devServer: {
			static: {
				directory: path.join(__dirname, 'src')
			},
			compress: true,
			port: 9000
		}
	};
};
