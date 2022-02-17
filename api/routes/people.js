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

people.get('/all/:token', async function (req, res, next){
    console.log("here is the users token", req.params)
    await peopleModel.getByNameAllRelationships(req.params.token)
    .then(result => writeResponse(res, result))
    .catch(next);
})

people.post('/', async function (req, res, next){
    console.log(req.body.token)
    await peopleModel.createPerson(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

/***
 * name becomes token from here on out 
 * 
 ***/

people.put('/:token', async function (req, res, next){
    
    await peopleModel.findbyNameAndUpdate(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

//--------------------
//Relationship methods
//--------------------


//---Interest Node---

//Create
people.post('/interest/:token', async function (req, res, next){
    await peopleModel.createRelationshipWithInterest(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

//---Course Node---

//Create
people.post('/course/:token', async function (req, res, next){
    //console.log(req.params.name, req.body)
    await peopleModel.createRelationshipWithCourse(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);

})

//---Country Node---

//Create
people.post('/country/:token', async function (req, res, next){
    console.log("We now have:", req.body)
    await peopleModel.createRelationshipWithCountry(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})


//Delete
/*
people.delete('/country/:name', async function (req, res, next){
    await peopleModel.deleteRelationshipWithCountry(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

//Delete
people.delete('/course/:name', async function (req, res, next){
    await peopleModel.deleteRelationshipWithCourse(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

//Delete
people.delete('/interest/:name', async function (req, res, next){
    await peopleModel.deleteRelationshipWithInterest(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);

people.delete('/:name', async function (req, res, next){
    console.log(req.params.name)
    await peopleModel.findByNameAndDelete(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})
})

*/
module.exports = people;
