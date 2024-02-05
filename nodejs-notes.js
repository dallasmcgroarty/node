
/**
 * Nodejs Notes
 * 
 *  - javascript runtime engine
    - javascript executed outside of the browser
    -  use a web server
    - javascript on the server side (front end devs can now be backend devs)
 */

/**
* node js pros
*
* - single threaded, event driven, non blocking i/o model
  - perfect for building fast and scalable data-intensive apps
  - APIs, data streaming, real time chat apps, etc...
  - NPM
**/

/**
 * Synchronous vs aysnchronous
 * 
 * - synchronous - blocking code
 * - asynchronous - non-blocking code
 */

/**
 * NPM
 * 
 * - node package manager
 * - before dependency version add ~ to only accept patch changes ex. (~1.4.0)
 * - before dependency version add ^ to accept minor or patch changes ex. (^1.4.0)
 * - in terminal use -> npm update [package] --save to save version changes to package.json
 */

/**
 * Web recap
 * - client <-> server
 * - client requests data from server, server serves the data to client
 * 
 * Front End Stack
 * - HTML, CSS, JavaScript, React, Vue, Bootstrap, Tailwind, etc...
 * 
 * Back End Stack
 * - Node.js, PHP, SQL, Python, PostgreSQL, etc...
 */


/**
 * Express.js
 * - minimal node.js framework, higher level of abstraction
 * - contains very robust set of features: complex routing, easier handlign of req and res,
 *   middleware, server-side rendering, etc..
 * - allows for rapid development of node.js apps
 * - makes it easier to organize an application in the MVC architecture
 */


/***
 * API - application programming interface
 * - allows applications to talk to each other
 */

/**
 * Rest architecture
 *  - separate API into logical resources
 *  - expose structured, resource-based URLS
 *  - use HTTP methods
 *  - send data as JSON (usually)
 *  - must be stateless
 * 
 *  - end points should only be nouns representing the data being transferred:
 *    - ex.) /tours, /users, /reviews
 *    - then for each end point use http method for interacting with data
 *      ex.) GET /tours, DELETE /users/2, POST /reviews 
 * 
 *  - use CRUD operations: Create, Read, Update, Delete
 */