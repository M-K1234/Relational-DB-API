const neo4j = require('neo4j-driver');
const { v4: uuidv4 } = require('uuid');
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

async function createCharacter(character) {
    const session = driver.session();
    character.character_id = uuidv4();
    try {
        const result = await session.run(
            'CREATE (c:Character {character_id: $character_id, name: $name, level: $level, strength: $strength, dexterity: $dexterity, intelligence: $intelligence}) RETURN c',
            character
        );
        return result.records[0].get('c').properties;
    } catch (error) {
        console.error('Error creating character', error);
        throw error;
    } finally {
        await session.close();
    }
}
async function createTrainer(trainer, character_id) {
    const session = driver.session();
    trainer.trainer_id = uuidv4();
    try {
        const result = await session.run(
            'MATCH (c:Character {character_id: $character_id}) ' +
            'CREATE (t:Trainer {trainer_id: $trainer_id, pet_affinity: $pet_affinity})-[:HAS_CHARACTER]->(c) ' +
            'RETURN t, c',

            { ...trainer , character_id}
        );
        return {
            trainer: result.records[0].get('t').properties,
            character: result.records[0].get('c').properties
        };
    } catch (error) {
        console.error('Error creating trainer with relationship', error);
        throw error;
    } finally {
        await session.close();
    }
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
async function getTrainers() {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (t:Trainer)-[:HAS_CHARACTER]->(c:Character) RETURN t, c');
        return result.records.map(record => ({
            trainer: record.get('t').properties,
            character: record.get('c').properties
        }));
    } catch (error) {
        console.error('Error getting trainers', error);
        throw error;
    } finally {
        await session.close();
    }
}

module.exports = {
    connectToNeo4j,
    closeNeo4jConnection,
    getCharacters,
    createCharacter,
     createTrainer,
     getTrainers
};