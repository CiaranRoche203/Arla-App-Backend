const session = require('../helpers/dbUtility');

const getAll = async () =>{
    const result = await session.run('MATCH (country:Country) RETURN country')
    return result.records.map(r => r.get('country').properties)
}

const getByName = async (name) =>{
    const result = await session.run(`MATCH (country:Country {name: '${name}'}) RETURN country`)
    return result.records.map(r => r.get('country').properties)
}

const getByCountryAllRelationships = async (name) =>{
    const result = await session.run(`MATCH (country:Country {name: '${name}'})<-[:LIVES_IN]-(people) RETURN people`)
    return result.records.map(r => r.get('people').properties)
}

const create = async (country) =>{
    const result = await session.run(`MERGE (country:Country {name: '${country.name}'}) RETURN country`)
    return result.records.map(r => r.get('country').properties)
}

const findbyNameAndUpdate = async (name, country) =>{
    const result = await session.run(`MATCH (country:Country {name: '${name}'}) SET country.name = '${country.name}' RETURN country`)
    return result.records.map(r => r.get('country').properties)
}

const findByNameAndDelete = async (name) =>{
    const result = await session.run(`MATCH (country:Country {name: '${name}'}) DETACH DELETE country`)
    return result.records.map(r => r.get('country').properties)
}

module.exports = {
    getAll: getAll,
    getByName: getByName,
    getByCountryAllRelationships: getByCountryAllRelationships,
    create: create,
    findbyNameAndUpdate: findbyNameAndUpdate,
    findByNameAndDelete: findByNameAndDelete
};