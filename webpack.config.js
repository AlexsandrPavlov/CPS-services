const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { Template } = require('webpack');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loader = require('sass-loader');
const GhPagesWebpackPlugin = require('gh-pages');

module.exports = (env) => {
	return {
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src', 'main.js'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			assetModuleFilename: 'assets/images/[name].[contenthash].[ext]',
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
						'group-css-media-queries-loader',
						'resolve-url-loader',
						{ loader: 'sass-loader', options: { sourceMap: true } }
					]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[name][ext]'
					}
				},
				{
					test: /\.(jpe?g|png|webp|gif|svg)$/i,
					use: [
						{
							loader: 'image-webpack-loader',
							options: {
								mozjpeg: {
									progressive: true
								},
								optipng: {
									enabled: false
								},
								pngquant: {
									quality: [0.65, 0.9],
									speed: 4
								},
								gifsicle: {
									interlaced: false
								},
								webp: {
									quality: 75
								}
							}
						}
					],
					type: 'asset/resource'
				},
				{
					test: /\.(?:js|mjs|cjs)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							targets: 'defaults',
							presets: [['@babel/preset-env']]
						}
					}
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
