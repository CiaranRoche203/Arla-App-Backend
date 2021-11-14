'use strict';

const nconf = require('../config'),
 neo4j = require('neo4j-driver'),
 driver = neo4j.driver(nconf.get('url'), neo4j.auth.basic(nconf.get('username'), nconf.get('password'))),
 session = driver.session();
 
module.exports = session;