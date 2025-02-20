const env = require('dotenv');
env.config();
const neo4j = require('./../../databases/neo4j/neo4j');
const express = require('express');
const router = express.Router();

router.get('/neo', async (req, res) => {
   await neo4j.connectToNeo4j('bolt://localhost:7687', 'neo4j', 'ali123456');
    const characters = await neo4j.getCharacters();
    await neo4j.closeNeo4jConnection();
    res.json(characters);
})

module.exports = router;