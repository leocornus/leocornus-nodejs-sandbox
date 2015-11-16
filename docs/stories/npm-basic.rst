npm basic usage story
=====================

how to use npm in a concise way!

bump package version
--------------------

The **npm version** command could:

- patch a minor release
- publish a major release
- sign a git tag, depends on the **sign-git-tag** config.

Here are some samples::

  $ npm config set sign-git-tag true
  # minor patch
  $ npm version patch
  # do a major release.
  $ npm version 2.0.0 major

Using the **publish** command to publish a package::

  $ npm publish

Manually add a tag
------------------

steps::

  $ git tag -a v0.0.1 -m "release 0.0.1 basic npm module"
  $ git push --tags origin

Get more log from npm
---------------------

set log level to get more logging message::

  $ npm config set loglevel verbose
