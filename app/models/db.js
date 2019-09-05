'use strict';

const Config = require('../../config/config');
const mongoose = require('mongoose');

async function dbInit() {
    try {
        let db = mongoose.connection;
        mongoose.connect(`mongodb://${Config.database.host}:${Config.database.port}/${Config.database.db}`, { useNewUrlParser: true });
        db.on('open', async function() {
            console.log('Database is connected...');
        });

        db.on('error', function(err) {
            console.log(err);
            console.log('Database connection error ...');
            setTimeout(function() { dbInit(); }, 60000);
        });
    } catch (err) {
        console.log(err);
    }
}

exports.dbInit = dbInit;