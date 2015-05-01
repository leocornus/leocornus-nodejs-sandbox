// karma config for using mocha framework.
module.exports = function(config) {
  config.set({

    basePath : '../',

    files : [
      'test/mocha-web/*.js'
    ],

    autoWatch : true,
    singleRun : true,

    frameworks: ['mocha', 'chai'],

    browsers : ['Firefox'],

    plugins : [
            'karma-chai',
            'karma-mocha',
            'karma-firefox-launcher',
            'karma-mocha-reporter'
            ],

    colors : true,

    reporters: ['mocha']
  });
};
