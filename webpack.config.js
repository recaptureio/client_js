var webpack = require('webpack');
var path = require('path');
var version = require('./package').version;

var env = process.env.NODE_ENV || 'development';
var isProduction = env === 'production';
var plugins = [
  new webpack.BannerPlugin('Recapture.io v' + version + ' | MIT & BSD')
];

if (isProduction) {
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: {
    recapture: path.join(__dirname, 'src/index.js'),
    loader: path.join(__dirname, 'src/loader.js')
  },

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: isProduction ? '[name].min.js' : '[name].js',
    libraryTarget: 'umd'
  },

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  plugins: plugins
};
