Selenium WebDrivers Speedup
==========================

Some facts.

- selenium webdervers has built-in support for Firefox browser.
- drivers for any other browser has to be installed.
- drivers executables have to be placed on PATH.
- `selenium-webdrivers api docs`_ has most comprehensive details.

The `choosing your automated acceptance testing`_ framework has 
a good analyitze about different end to end testing framework.

Chrome libc and kernel
----------------------

The chrome driver depends on chrome binary installation.
Chrome browser does NOT support some no linux distributions.
The common Error you will get when you try to install Chrome::

  Error: Missing Dependency: libc.so.6(GLIBC_2.6)(64bit) is needed by package g

In this case, you will need update Linux kernel to get the newer 
version of libc.::

  $ yum update kernel
  // call update again after reboot your linux.
  $ yum update

jdk dependence
--------------

Selenium depends on Java run time to load the selenium server.
Make sure Java is available on your testing machine.

Selenium standalone server requires Java version 1.7 or higher to
run.

.. _selenium-webdirvers api docs: http://seleniumhq.github.io/selenium/docs/api/javascript/
.. _choosing your automated acceptance testing: http://dev.imagineeasy.com/post/90475083894/choosing-your-automated-acceptance-testing
