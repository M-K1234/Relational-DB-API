const neo4j = require('neo4j-driver');
const { v4: uuidv4 } = require('uuid');
const env = require('dotenv');
env.config();


async function connectToNeo4j(uri, user, password) {
    
    let driver;
    try {
    driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
        console.log('Connected to Neo4j');
    } catch (error) {
        console.error('Error connecting to Neo4j', error);
        throw error;
    }

    return driver;
}
async function closeNeo4jConnection(driver) {
    driver.close();
    console.log('Neo4j connection closed');
}


async function getTrainers(driver) {
    const session = driver.session({database: 'dogeverse'});
        const result = await session.run('MATCH (t:Trainer) RETURN t;');
        return result.records.map(record => ({
            trainer: record.get('t').properties
        }));
  
}

module.exports = {
    connectToNeo4j,
    closeNeo4jConnection,
     getTrainers
};