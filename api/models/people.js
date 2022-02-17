const session = require('../helpers/dbUtility');

const getAll = async () =>{
    const result = await session.run('MATCH (people:Person) RETURN people')
    return result.records.map(r => r.get('people').properties)
}

const getByName = async (token) =>{
    //console.log("here is the token boy", token)
    const result = await session.run(`MATCH (people:Person {name: '${token}'}) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const getByNameAllRelationships = async (name) =>{
    console.log(name)
    const result = await session.run(`MATCH (people:Person {token: '${name}'})
    OPTIONAL MATCH (people)-[r:GRADUATED]->(course:Course) 
    OPTIONAL MATCH (people)-[:INTEREST_IN]->(interest:Interest)
    OPTIONAL MATCH (people)-[:LIVES_IN]->(country:Country)
    RETURN DISTINCT people.name, course.name, r.year, interest.name, country.name`)
    const resultsArray = {}
    resultsArray.people = result.records.map(r => r.get('people.name'))
    resultsArray.course = result.records.map(r => r.get('course.name'))
    resultsArray.course_Year = result.records.map(r => r.get('r.year'))
    resultsArray.interest = result.records.map(r => r.get('interest.name'))
    resultsArray.country = result.records.map(r => r.get('country.name'))
   
    return resultsArray
}

//change this to a user creation
// person.name will become say google id, person.bio will become google email
// name will now be id
const createPerson = async (person) =>{
    const result = await session.run(`MERGE (people:Person {token: '${person.token}', email: '${person.email}'}) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

//use this to update the profile

//so have to change that to a unique token being passed across, 
const findbyNameAndUpdate = async (person) =>{
    console.log("stuff: ", person)
    const result = await session.run(`MATCH (people:Person {token: '${person.token}'}) SET people.name = '${person.name}', people.bio = '${person.bio}' RETURN people`)
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
    console.log("Name is: ", name.name, "course is: ", name.course)
    const result = await session.run(`MATCH (people:Person), (course:Course)
    WHERE people.token = '${name.name}' AND course.name = '${name.course}'
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
    console.log("Here is: ", name.name, name.country)
    const result = await session.run(`MATCH (people:Person), (country:Country)
    WHERE people.token = '${name.name}' AND country.name = '${name.country}'
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