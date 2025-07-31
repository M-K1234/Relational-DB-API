const env = require('dotenv');
env.config();
const mongo = require('../../databases/mongo/mongoDatabase');
const express = require('express');
const { TrainerModel } = require('../../databases/mongo/schemas/trainerSchema');

const router = express.Router();

router.get('/mongo/trainer/:id', async (req, res) => {
    await mongo.connectMongo();
    const trainer = await mongo.getTrainerById(TrainerModel, req.params.id);
    await mongo.closeMongoConnection();

    res.json({ trainer });
});
router.get('/mongo/trainers', async (req, res) => {
    await mongo.connectMongo();
    const trainers = await mongo.getTrainers(TrainerModel);
    await mongo.closeMongoConnection();
    res.json({ trainers });
})

router.post('/mongo/trainer', async (req, res) => {
  
})

router.put('/mongo/trainer', async (req, res) => {

})

router.delete('/mongo/trainer', async (req, res) => {
 
})

module.exports = router;