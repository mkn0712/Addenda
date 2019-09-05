/**
 * Import dependencies
 */

"use strict";

const server = require('./listener/server');
const serverInit = require('./app/init/init');
const router = require('./app/routes/router');

/**
 * Initialize server
 */
serverInit.serverInit();

/**
 * Initialize router
 */
server.start(router.router);