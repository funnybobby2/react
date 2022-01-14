const paths = require('./paths')
// const Dotenv = require('dotenv-webpack') // A secure webpack plugin that supports dotenv and other environment variables and only exposes what you choose and use. [ENV-VAR]
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.[js]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    /*new Dotenv({ // pour passer des variables d'environnement vers le code, ou il sera lu en faisant process.env.API_URL par exemple [ENV-VAR]
      path: './.env.development', // avec une variable d'environnement API_URL défini dans .env.development
    }),*/
    // new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
})