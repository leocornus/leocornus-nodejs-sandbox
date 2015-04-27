Jasmine Testing Story
=====================

The easiest way to use Jasmine testing a JavaScript language.

1. Create a simplest test case
-------------------------------

let's start with a simplest test case.
::

  // a very simple testing.
  describe('A suite', function() {
    it("contains a pect with an expectation", function() {
      expect(true).toBe(true);
    });
  });

We will save it as file **test/jasmine/introduction.js**

2. Execute the test case
------------------------

There are many ways to execute Jasmine test cases
(test specs in Jasmine world).

jasmine npm module
~~~~~~~~~~~~~~~~~~

How to use the jasmin-npm module to execute the specs directly?

install the jasmine-npm to the package::

  $ npm install --save-dev jasmine

get ready the jasmine spec config file **jasmine.json**::

  {
    "spec_dir": "test",
    "spec_files": [
      "jasmine/**/*.js"
    ],
    "helpers": [
      "helpers/**/*.js"
    ]
  }

we will save this in file **test/jasmine.json**.

Then create the script in file **package.json**
::

  "jasmine": "jasmine JASMINE_CONFIG_PATH=test/jasmine.json"

The default value for **JASMINE_CONFIG_PATH** is
**spec/support/jasmin.json**.

Now we could execute the specs like following::

  $ npm run jasmine
