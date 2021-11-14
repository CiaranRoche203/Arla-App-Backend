'use strict';

require('dotenv').config();
var nconf = require('nconf');

nconf.env(['PORT'])
    .argv({
        'p': {
            alias: 'PORT',
            describe: 'Port to run on.',
            demand: false,
            default: 3000
        }
    })
        .defaults({
            'username': process.env.DATABASE_USERNAME,
            'password': process.env.DATABASE_PASSWORD,
            'url': process.env.DATABASE_URL,
        });

module.exports = nconf;