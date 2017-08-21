const path = require('path');

module.exports = {
  entry: [
    './src/jquery/simple-plugin.js',
    './src/jquery/entry.js',
    './src/js-core/simple.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo/webpack')
  }
};
