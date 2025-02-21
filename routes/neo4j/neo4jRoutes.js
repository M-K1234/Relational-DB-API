const env = require('dotenv');
env.config();
const neo4j = require('../../databases/neo4j/neo4jDatabase');
const express = require('express');
const router = express.Router();

router.post('/neo4j/trainer', async (req, res) => {
    await neo4j.connectToNeo4j(process.env.NEO4J_URL, process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD);
     const characters = await neo4j.createCharacter(req.body[0]);
     const trainer = await neo4j.createTrainer(req.body[1], characters.character_id);
     console.log(typeof trainer);
     await neo4j.closeNeo4jConnection();
     res.json({"characters": characters, "trainer": trainer});
 })

module.exports = router;