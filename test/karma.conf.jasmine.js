// karma config for using jasmine framework.
module.exports = function(config) {
  config.set({

    basePath : '../',

    files : [
      'test/jasmine/*.js'
    ],

    autoWatch : true,
    singleRun : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-firefox-launcher',
            'karma-mocha-reporter',
            'karma-jasmine'
            ],

    colors : true,

    reporters: ['mocha', 'dots']
  });
};
