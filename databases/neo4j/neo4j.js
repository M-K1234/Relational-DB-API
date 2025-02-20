const neo4j = require('neo4j-driver');

let driver;

async function connectToNeo4j(uri, user, password) {
    try {
        driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
        console.log('Connected to Neo4j');
    } catch (error) {
        console.error('Error connecting to Neo4j', error);
        throw error;
    }
}

async function closeNeo4jConnection() {
    driver.close();
    console.log('Neo4j connection closed');
}

async function getCharacters() {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (c:Character) RETURN c');
        return result.records.map(record => record.get('c').properties);
    } catch (error) {
        console.error('Error getting characters', error);
        throw error;
    } finally {
        await session.close();
    }
}

module.exports = {
    connectToNeo4j,
    closeNeo4jConnection,
    getCharacters
};