const express = require('express'),
 peopleModel = require('../models/people'),
 people = express.Router(),
 writeResponse = require('../helpers/response').writeResponse;

people.get('/', async function (req, res, next){
    await peopleModel.getAll()
    .then(result => writeResponse(res, result))
    .catch(next);
})

module.exports = people;
