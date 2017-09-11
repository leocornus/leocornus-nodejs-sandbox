const path = require('path');

module.exports = {
  entry: [
    './src/justified-layout/simple-layout.js'
  ],
  output: {
    filename: 'simple-layout-bundle.js',
    path: path.resolve(__dirname, '../../demo/justified-layout')
  }
};
