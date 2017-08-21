const path = require('path');

module.exports = {
  entry: [
    './src/jquery/simple-plugin.js',
    './src/jquery/entry.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'demo/webpack')
  }
};
