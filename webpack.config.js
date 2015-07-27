var webpack = require('webpack');
var path = require('path');

var env = process.env.NODE_ENV || 'development';
var isProduction = env === 'production';
var plugins = [];

if (isProduction) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: isProduction ? 'recapture.min.js' : 'recapture.js',
    library: 'Recapture',
    libraryTarget: 'var'
  },

  // module: {
  //   loaders: [{
  //     test: /\.js$/,
  //     exclude: /(node_modules)/,
  //     loader: 'babel'
  //   }]
  // },

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  plugins: plugins
};
