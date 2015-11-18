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


