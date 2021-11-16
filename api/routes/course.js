const express = require('express'),
 courseModel = require('../models/course'),
 course = express.Router(),
 writeResponse = require('../helpers/response').writeResponse;

course.get('/', async function (req, res, next){
    await courseModel.getAll()
    .then(result => writeResponse(res, result))
    .catch(next);
})

course.get('/:name', async function (req, res, next){
    await courseModel.getByName(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

course.get('/all/:name', async function (req, res, next){
    await courseModel.getByCourseAllRelationships(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

course.post('/', async function (req, res, next){
    await courseModel.create(req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

course.put('/:name', async function (req, res, next){
    await courseModel.findbyNameAndUpdate(req.params.name, req.body)
    .then(result => writeResponse(res, result))
    .catch(next);
})

course.delete('/:name', async function (req, res, next){
    await courseModel.findByNameAndDelete(req.params.name)
    .then(result => writeResponse(res, result))
    .catch(next);
})

module.exports = course;
