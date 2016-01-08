Webdirver to do funtion test
============================

target:

- WebdriverIO and gulp-webdriver
- selenium-standalone
- gulp tasks 

Manual Setup for Windows
------------------------

to set up gulp-webdriver on Windows desktop, we need manually
update the following things.

- file node_modules/selenium-standalone/lib/compute-fs-paths.js.
  we need add the **.exe** extension for **chromedriver**.
- [Behind fireware] manually download jar file and drivers
  and construct the folder in **selenium-standalone/.selenium**.
- manually set up path for **wdioBin**.
  It is in file **gulp-webdriver/index.js**. 

.. _Selenium testing workflow with WebdirverIO: https://twin.github.io/selenium-testing-workflow-with-webdriverio/
