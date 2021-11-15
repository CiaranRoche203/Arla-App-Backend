const express = require('express'),
 peopleModel = require('../models/people'),
 people = express.Router(),
 writeResponse = require('../helpers/response').writeResponse;

people.get('/', async function (req, res, next){
    await peopleModel.getAll()
    .then(result => writeResponse(res, result))
    .catch(next);
})

people.get('/:name', async function (req, res, next){
    await peopleModel.getByName(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

people.get('/all/:name', async function (req, res, next){
    await peopleModel.getByNameAllDetails(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

people.post('/', async function (req, res, next){
    await peopleModel.create(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

module.exports = people;
