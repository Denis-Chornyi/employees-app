const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';
  const config = {
    entry: './src/index.jsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.s?css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(jpg|png|gif|svg|webp)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name].[ext]',
                outputPath: 'images'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'build')
      },
      historyApiFallback: true,
      open: true,
      hot: true,
      port: 7770
    }
  };

  if (isProduction) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (isProduction) {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    );
  }

  return config;
};
