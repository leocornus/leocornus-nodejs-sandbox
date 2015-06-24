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
  $ npm version patch -m "release %s for some bug fixes"
  # do a major release.
  $ npm version 2.0.0 major -m "Release %s to support gulp"

