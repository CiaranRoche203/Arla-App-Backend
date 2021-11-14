const session = require('../helpers/dbUtility');

const getAll = async () =>{
    const result = await session.run('MATCH (people:Person) RETURN people')
    return result.records.map(r => r.get('people').properties)
}

module.exports = {
    getAll: getAll
};