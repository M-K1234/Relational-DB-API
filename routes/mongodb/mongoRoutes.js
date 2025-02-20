const env = require('dotenv');
env.config();
const mongo = require('../../databases/mongo/mongoDatabase');
const express = require('express');
const {CharacterModel} = require('../../databases/mongo/schemas/characterSchema');
const { TrainerModel } = require('../../databases/mongo/schemas/trainerSchema');

const router = express.Router();

router.get('/mongo/trainer', async (req, res) => {
    await mongo.connectMongo();
    const trainer = await mongo.getTrainerById(trainerModel, req.body.trainer_id);
    const character = await mongo.getCharacterById(characterModel, req.body.character_character_id);
    await mongo.closeMongoConnection();
    
    res.json({character, trainer});
});
router.get('/mongo/trainers', async (req, res) => {
    await mongo.connectMongo();
    const characters = await mongo.getCharacters(characterModel);
    const trainers = await mongo.getTrainers(trainerModel);
    await mongo.closeMongoConnection();
    res.json({ characters, trainers });
})

router.post('/mongo/trainer', async (req, res) => {
    await mongo.connectMongo();

    // const newCharacter = new CharacterModel(req.body[0]);
    // const newTrainer = new TrainerModel(req.body[1]);

    const character = await mongo.createCharacter(CharacterModel, req.body[0]);
    const trainer = await mongo.createTrainer(TrainerModel, character._id, req.body[1]);

    await mongo.closeMongoConnection();
    res.json({character, trainer});
})

router.put('/mongo/trainer', async (req, res) => {
    await mongo.connectMongo();
    const mbab = await mongo.getCharacters();
    console.log(mbab.length)
    await mongo.closeMongoConnection();
    res.json(mbab)
})

router.delete('/mongo/trainer', async (req, res) => {
    await mongo.connectMongo();
    const mbab = await mongo.getCharacters();
    console.log(mbab.length)
    await mongo.closeMongoConnection();
    res.json(mbab)
})

module.exports = router;