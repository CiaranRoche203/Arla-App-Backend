const session = require('../helpers/dbUtility');

const getAll = async () =>{
    const result = await session.run('MATCH (course:Course) RETURN course')
    return result.records.map(r => r.get('course').properties)
}

const getByName = async (name) =>{
    const result = await session.run(`MATCH (course:Course {name: '${name}'}) RETURN course`)
    return result.records.map(r => r.get('course').properties)
}

const getByCourseAllRelationships = async (name) =>{
    const result = await session.run(`MATCH (course:Course {name: '${name}'})<-[:LIVES_IN]-(people) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const create = async (course) =>{
    const result = await session.run(`MERGE (course:Course {name: '${course.name}'}) RETURN course`)
    return result.records.map(r => r.get('course').properties)
}

const findbyNameAndUpdate = async (name, course) =>{
    const result = await session.run(`MATCH (course:Course {name: '${name}'}) SET course.name = '${course.name}' RETURN course`)
    return result.records.map(r => r.get('course').properties)
}

const findByNameAndDelete = async (name) =>{
    const result = await session.run(`MATCH (course:Course {name: '${name}'}) DETACH DELETE course`)
    return result.records.map(r => r.get('course').properties)
}

module.exports = {
    getAll: getAll,
    getByName: getByName,
    getByCourseAllRelationships: getByCourseAllRelationships,
    create: create,
    findbyNameAndUpdate: findbyNameAndUpdate,
    findByNameAndDelete: findByNameAndDelete
};