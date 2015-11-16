exports.config = {

  allScriptsTimeout: 21000,

  specs: [
    'protractor/*.js'
  ],

  //capabilities: {
  //  'browserName': 'firefox'
  //},

  multiCapabilities: [
    {'browserName': 'firefox'},
    {'browserName': 'chrome'}
  ],

  chromeOnly: false,

  baseUrl: 'http://localhost:8900/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
