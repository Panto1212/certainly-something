const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: '[name].js'
  },
  entry: {
    'background': './src/background/entry.js',
    'viewer/index': './src/viewer/js/index.js'
  },
//  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            'presets': [
              ['env', {
                'targets': {
                  'firefox': 62
                }
              }]
            ]
          }
        }]
      },
      {
        test: /\.handlebars$/,
        loaders: [
          'handlebars-loader'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json'
      },
      {
        from: 'src/icons/*.svg',
        to: 'icons/',
        flatten: true
      },
      {
        from: 'src/viewer/index.html',
        to: 'viewer/index.html'
      },
      {
        from: 'src/viewer/css',
        to: 'viewer/index.css'
      }
    ])
  ]
};
