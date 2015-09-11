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
  entry: {
    recapture: path.join(__dirname, 'src/index.js'),
    'recapture-loader': path.join(__dirname, 'src/loader.js')
  },

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: isProduction ? '[name].min.js' : '[name].js',
    libraryTarget: 'umd',
    library: '[name]'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  plugins: plugins
};
