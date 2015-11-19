Development Web Server
======================

set up a development web server for testing.

http-server module
------------------

http-server module is a simple http webserver.

install::

  $ npm install http-server --save-dev

Set up the web server

We will create a simple npm script to start the Dev web server::

  "scripts": {
    "prestart" : "npm install",
    "start" : "http-server -a 0.0.0.0 -p 9000",
  },

Start the web server::

  $ npm start

Once the Web started on port 9000, you could visit it to verify
the server is running.

The web server will using project root folder as the 
ROOT DOCUMENT folder.
So normally a demo or testing HTML file will looks like this::

    <html>
      <head>
        <title>Testing Page</title>

        <link rel="stylesheet' href='/bower_component/bootstrap/dist/css/bootstrap.min.css'/>
        <script src='/bower_component/bootstrap/dist/js/bootstrap.min.js'></script>
      </head>
      <body>
        <div class="container">
          <p class="page-header">Hello Web Server</p>
        </div>
      </body>
    </html>

gulp-webserver
--------------

Gulp could control webserver start and stop through scripts.
It is very convenient for end to end test cases, 
which execute test cases against a real server.

install::

  $ npm install gulp-webserver --save-dev
  $ npm install gulp-exit --save-dev

create the web server task ::

  gulp.task('webserver', function() {
  
      // return the pipe will guarantee the sequence of 
      // the tasks who depends on the web server
      return gulp.src('.').pipe(webserver({
        host: '0.0.0.0',
        port: 8900,
        livereload: true,
        directoryListing: true,
        open: true
      }));
  });

The gulp-exit module will be used to stop the web server 
after all tasks are finished.
Here is an example::

  // the end 2 end task, which depends on web server.
  gulp.task('e2e-test', ['webserver'], function() {
      // set the task for end 2 end testing...
      // NOTE: make sure to use return to guarantee the 
      // sequence.
  });

  // exit after all tests are done.
  var exit = require('gulp-exit');
  gulp.task('exit', ['e2e-test'], function() {
      // a force exit
      gulp.src("").pipe(exit());
  });
