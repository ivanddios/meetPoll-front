Meet Poll (extended) 
=============
Extended web application of [first version](https://github.com/ivanddios/meetPoll)

## Extension
[meetPoll](https://github.com/ivanddios/meetPoll) based on
[fronty.js](https://github.com/lipido/fronty.js),
[jQuery.js](https://jquery.com/) and [Handlebars](http://handlebarsjs.com/)

This front-end of [meetPoll](https://github.com/ivanddios/meetPoll) uses JavaScript
and AJAX and interacts with the backend via its REST API.

## Architecture overview

The base architecture is defined by
[fronty.js](https://github.com/lipido/fronty.js).  In this sense, the main
artifacts are:

- Models, which are JavaScript objects containing application state, like
  `PostsModel` and `UserModel`.
- Components, which are JavaScript objects in charge of rendering different
  parts of the application.
- Renderers in [Handlebars](http://handlebarsjs.com/) language containing the
  HTML fragments separated from JavaScript.

In addition, this application includes a library for Internationalization (I18n)
in `js/i18n` folder.

## Installation

A quick installation process could be:

1. Download and install [meetPoll](https://github.com/ivanddios/meetPoll), the
   backend-app (you will need a PHP-enabled server and MySQL).
2. Download
[meetPoll-front](https://github.com/ivanddios/meetPoll-front/archive/master.zip) and copy
it inside the backend app, for example in `/frontend`.
3. Start your server and access it: http://localhost/meetPoll/frontend/index.html.
