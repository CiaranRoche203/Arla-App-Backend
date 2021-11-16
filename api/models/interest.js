const session = require('../helpers/dbUtility');

const getAll = async () =>{
    const result = await session.run('MATCH (interest:Interest) RETURN interest')
    return result.records.map(r => r.get('interest').properties)
}

const getByName = async (name) =>{
    const result = await session.run(`MATCH (interest:Interest {name: '${name}'}) RETURN interest`)
    return result.records.map(r => r.get('interest').properties)
}

const getByInterestAllRelationships = async (name) =>{
    const result = await session.run(`MATCH (interest:Interest {name: '${name}'})<-[:INTEREST_IN]-(people) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const create = async (interest) =>{
    const result = await session.run(`MERGE (interest:Interest {name: '${interest.name}'}) RETURN interest`)
    return result.records.map(r => r.get('interest').properties)
}

const findbyNameAndUpdate = async (name, interest) =>{
    const result = await session.run(`MATCH (interest:Interest {name: '${name}'}) SET interest.name = '${interest.name}' RETURN interest`)
    return result.records.map(r => r.get('interest').properties)
}

const findByNameAndDelete = async (name) =>{
    const result = await session.run(`MATCH (interest:Interest {name: '${name}'}) DETACH DELETE interest`)
    return result.records.map(r => r.get('interest').properties)
}

module.exports = {
    getAll: getAll,
    getByName: getByName,
    getByInterestAllRelationships: getByInterestAllRelationships,
    create: create,
    findbyNameAndUpdate: findbyNameAndUpdate,
    findByNameAndDelete: findByNameAndDelete
};