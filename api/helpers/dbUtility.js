'use strict';

const nconf = require('../config'),
 neo4j = require('neo4j-driver'),
 driver = neo4j.driver(nconf.get('url'), neo4j.auth.basic(nconf.get('username'), nconf.get('password')));

exports.getSession = function (context) {
    if(context.neo4jSession){
        return neo4jSession
    } 
    else {
        context.neo4jSession = driver.session();
        return context.neo4jSession;
    }
};