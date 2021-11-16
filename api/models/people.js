const session = require('../helpers/dbUtility');

const getAll = async () =>{
    const result = await session.run('MATCH (people:Person) RETURN people')
    return result.records.map(r => r.get('people').properties)
}

const getByName = async (name) =>{
    const result = await session.run(`MATCH (people:Person {name: '${name}'}) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const getByNameAllRelationships = async (name) =>{
    const result = await session.run(`MATCH (people:Person {name: '${name}'})-[r]-(b)
    RETURN DISTINCT people, r, b`)
    const resultsArray = {}
    resultsArray.person = result.records.map(r => r.get('people').properties)
    resultsArray.relationship = result.records.map(r => r.get('r').properties)
    resultsArray.otherNode = result.records.map(r => r.get('b').properties)
    return resultsArray
}

const create = async (person) =>{
    const result = await session.run(`MERGE (people:Person {name: '${person.name}', bio: '${person.bio}'}) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const findbyNameAndUpdate = async (name, person) =>{
    const result = await session.run(`MATCH (people:Person {name: '${name}'}) SET people.name = '${person.name}', people.bio = '${person.name}' RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const findByNameAndDelete = async (name) =>{
    const result = await session.run(`MATCH (people:Person {name: '${name}'}) DETACH DELETE people`)
    return result.records.map(r => r.get('people').properties)
}

module.exports = {
    getAll: getAll,
    getByName: getByName,
    getByNameAllRelationships: getByNameAllRelationships,
    create: create,
    findbyNameAndUpdate: findbyNameAndUpdate,
    findByNameAndDelete: findByNameAndDelete
};