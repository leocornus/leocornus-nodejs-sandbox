exports.config = {

  allScriptsTimeout: 21000,

  specs: [
    'protractor/*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  //capabilities: {
  //  'browserName': 'chrome'
  //},

  //multiCapabilities: [
  //  {'browserName': 'firefox'},
  //  {'browserName': 'chrome'}
  //],

  chromeOnly: false,

  baseUrl: 'http://localhost:8900/',

  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    // turn off the default dot report.
    print: function() {}
  },

  onPrepare: function() {

    var SpecReporter = require('jasmine-spec-reporter');
    // add jasmine spec reporter.
    jasmine.getEnv().addReporter(new SpecReporter({
        displayStacktrace: 'all'
    }));
  }
};
