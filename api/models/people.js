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
    resultsArray.course_Year = result.records.map(r => r.get('r.year'))
    resultsArray.interest = result.records.map(r => r.get('interest.name'))
    resultsArray.country = result.records.map(r => r.get('country.name'))
    return resultsArray
}

const createPerson = async (person) =>{
    const result = await session.run(`MERGE (people:Person {name: '${person.name}', bio: '${person.bio}'}) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const findbyNameAndUpdate = async (name, person) =>{
    const result = await session.run(`MATCH (people:Person {name: '${name}'}) SET people.name = '${person.name}', people.bio = '${person.bio}' RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const findByNameAndDelete = async (name) =>{
    const result = await session.run(`MATCH (people:Person {name: '${name}'}) DETACH DELETE people`)
    return result.records.map(r => r.get('people').properties)
}

//--------------------
//Relationship methods
//--------------------


//---Interest Node---

//Create
const createRelationshipWithInterest = async (name) =>{
    const result = await session.run(`MATCH (people:Person), (interest:Interest)
    WHERE people.name = '${name.name}' AND interest.name = '${name.interest}'
    MERGE (people)-[:INTEREST_IN]->(interest)
    RETURN people`)
    return result.records.map(r => r.get('people').properties)
}
//Delete
const deleteRelationshipWithInterest = async (name, interest) =>{
    const result = await session.run(`MATCH (people:Person {name: '${name}'})-[relship:INTEREST_IN]->(interest:Interest {name: '${interest.name}'}) DELETE relship`)
    return result.records.map(r => r.get('people').properties)
}


//---Course Node---

//Create
const createRelationshipWithCourse = async (name) =>{
    //console.log("Name is: ", name.name, "course is: ", name.course)
    const result = await session.run(`MATCH (people:Person), (course:Course)
    WHERE people.name = '${name.name}' AND course.name = '${name.course}'
    MERGE (people)-[relship:GRADUATED]->(course)
    RETURN people`)
    return result.records.map(r => r.get('people').properties)
}
//Delete
const deleteRelationshipWithCourse = async (name, course) =>{
    const result = await session.run(`MATCH (people:Person {name: '${name}'})-[relship:GRADUATED]->(course:Course {name: '${course.name}'}) DELETE relship`)
    return result.records.map(r => r.get('people').properties)
}


//---Country Node---

//Create
const createRelationshipWithCountry = async (name) =>{
    //console.log("Here is: ", name , country)
    const result = await session.run(`MATCH (people:Person), (country:Country)
    WHERE people.name = '${name.name}' AND country.name = '${name.country}'
    MERGE (people)-[:LIVES_IN]->(country)
    RETURN people`)
    return result.records.map(r => r.get('people').properties)
}
//Delete
const deleteRelationshipWithCountry = async (name, country) =>{
    const result = await session.run(`MATCH (people:Person {name: '${name}'})-[relship:LIVES_IN]->(country:Country {name: '${country.name}'}) DELETE relship`)
    return result.records.map(r => r.get('people').properties)
}



module.exports = {
    getAll: getAll,
    getByName: getByName,
    getByNameAllRelationships: getByNameAllRelationships,
    createPerson: createPerson,
    findbyNameAndUpdate: findbyNameAndUpdate,
    findByNameAndDelete: findByNameAndDelete,
    createRelationshipWithInterest: createRelationshipWithInterest,
    deleteRelationshipWithInterest: deleteRelationshipWithInterest,
    createRelationshipWithCourse: createRelationshipWithCourse,
    deleteRelationshipWithCourse: deleteRelationshipWithCourse,
    createRelationshipWithCountry: createRelationshipWithCountry,
    deleteRelationshipWithCountry: deleteRelationshipWithCountry
};