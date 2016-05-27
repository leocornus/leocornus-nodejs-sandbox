Firefox Story
=============

Downgrade Firefox on Ubuntu
---------------------------

Selenium Webdriver is very sensitive about Firefox's version.

Here are steps::

  $ aptitude purge firefox
  $ apt-cache showpkg firfox // list the versions
  $ aptitude install firefox=28.0+build2-0ubuntu2
  $ apt-mark hold firefox

The command **apt-mark hold** will tell aptitude NOT to upgrade
the newer version.
