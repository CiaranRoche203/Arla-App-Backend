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
    const result = await session.run(`MATCH (people:Person {name: '${name}'})
    OPTIONAL MATCH (people)-[r:GRADUATED]->(course:Course) 
    OPTIONAL MATCH (people)-[:INTEREST_IN]->(interest:Interest)
    OPTIONAL MATCH (people)-[:LIVES_IN]->(country:Country)
    RETURN DISTINCT course.name, r.year, interest.name, country.name`)
    const resultsArray = {}
    resultsArray.course = result.records.map(r => r.get('course.name'))
    resultsArray.course_Year = result.records.map(r => r.get('r.year').low)
    resultsArray.interest = result.records.map(r => r.get('interest.name'))
    resultsArray.country = result.records.map(r => r.get('country.name'))
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