const env = require('dotenv');
env.config();
const neo4j = require('../../databases/neo4j/neo4jDatabase');
const express = require('express');
const router = express.Router();


router.get('/neo4j/trainers', async (req, res) => {

    const driver = await neo4j.connectToNeo4j(process.env.NEO4J_URL, process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD);

    const trainers = await neo4j.getTrainers(driver);
    res.json({ trainers });
    await neo4j.closeNeo4jConnection(driver);
    

    
});

module.exports = router;