const express = require('express'),
 interestModel = require('../models/interest'),
 interest = express.Router(),
 writeResponse = require('../helpers/response').writeResponse;

interest.get('/', async function (req, res, next){
    await interestModel.getAll()
    .then(result => writeResponse(res, result))
    .catch(next);
})

interest.get('/:name', async function (req, res, next){
    await interestModel.getByName(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

interest.get('/all/:name', async function (req, res, next){
    await interestModel.getByInterestAllRelationships(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

interest.post('/', async function (req, res, next){
    await interestModel.create(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

interest.put('/:name', async function (req, res, next){
    await interestModel.findbyNameAndUpdate(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

interest.delete('/:name', async function (req, res, next){
    await interestModel.findByNameAndDelete(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

module.exports = interest;
