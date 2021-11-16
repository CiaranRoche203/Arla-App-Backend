const express = require('express'),
 countryModel = require('../models/country'),
 country = express.Router(),
 writeResponse = require('../helpers/response').writeResponse;

country.get('/', async function (req, res, next){
    await countryModel.getAll()
    .then(result => writeResponse(res, result))
    .catch(next);
})

country.get('/:name', async function (req, res, next){
    await countryModel.getByName(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

country.get('/all/:name', async function (req, res, next){
    await countryModel.getByCountryAllRelationships(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

country.post('/', async function (req, res, next){
    await countryModel.create(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

country.put('/:name', async function (req, res, next){
    await countryModel.findbyNameAndUpdate(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

country.delete('/:name', async function (req, res, next){
    await countryModel.findByNameAndDelete(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

module.exports = country;
