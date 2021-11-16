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
    await peopleModel.getByNameAllRelationships(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

people.post('/', async function (req, res, next){
    await peopleModel.createPerson(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

people.put('/:name', async function (req, res, next){
    await peopleModel.findbyNameAndUpdate(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

people.delete('/:name', async function (req, res, next){
    await peopleModel.findByNameAndDelete(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})



//--------------------
//Relationship methods
//--------------------


//---Interest Node---

//Create
people.post('/interest/:name', async function (req, res, next){
    await peopleModel.createRelationshipWithInterest(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})
//Delete
people.delete('/interest/:name', async function (req, res, next){
    await peopleModel.deleteRelationshipWithInterest(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})


//---Course Node---

//Create
people.post('/course/:name', async function (req, res, next){
    await peopleModel.createRelationshipWithCourse(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})
//Delete
people.delete('/course/:name', async function (req, res, next){
    await peopleModel.deleteRelationshipWithCourse(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})


//---Country Node---

//Create
people.post('/country/:name', async function (req, res, next){
    await peopleModel.createRelationshipWithCountry(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})
//Delete
people.delete('/country/:name', async function (req, res, next){
    await peopleModel.deleteRelationshipWithCountry(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})


module.exports = people;
