'use strict';

const db = require('../models/db');

async function serverInit() {
    await db.dbInit();
    console.log('Server Initialized');

    //await admin.checkadmin();
}

exports.serverInit = serverInit;