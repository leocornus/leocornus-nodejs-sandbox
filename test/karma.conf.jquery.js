// karma config for using jasmine framework.
module.exports = function(config) {
  config.set({

    // this folder will become /base on karma server
    basePath : '../',

    files : [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/bootstrap/dist/css/bootstrap.css',
      // HAVE to load the jquery plugin specifically
      'src/jquery/entry.js',
      'src/jquery/mw-sdk.js',
      'test/jquery/**/*.js',
      // load the html fixtures.
      'test/jquery/fixtures/*.html'
    ],

    autoWatch : true,
    singleRun : true,

    frameworks: ['jasmine-jquery', 'jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-firefox-launcher',
            'karma-mocha-reporter',
            'karma-jasmine',
            'karma-jasmine-jquery'
            ],

    colors : true,

    reporters: ['mocha']
  });
};
