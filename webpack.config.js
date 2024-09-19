const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_, argv) => {
  const isProduction = argv.mode === 'production';
  console.log(argv.mode);
  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
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
                outputPath: 'images',
                publicPath: '/images'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx']
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './public/favicon.ico'
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: '[name].css'
        }),
      isProduction && new webpack.HotModuleReplacementPlugin(),
      new CopyWebpackPlugin({
        patterns: [{ from: 'public/_redirects', to: '.' }]
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/images', to: 'images' }],
        patterns: [{ from: 'public/favicon.ico', to: '' }]
      })
    ].filter(Boolean),
    devServer: {
      static: {
        directory: path.join(__dirname, 'build')
      },
      historyApiFallback: true,
      open: true,
      hot: true,
      port: 7887
    }
  };
};
