const env = require('dotenv');
env.config();
const express = require('express')
const mysqlDatabase = require('../../databases/mysql/mysql')
const trainerModel = require('./../../databases/mysql/models/trainer')
const characterModel = require('./../../databases/mysql/models/character') 

const router = express.Router()

router.get('/mysql/trainer/all', async (req, res) => {
    const connection =  await mysqlDatabase.connect()
    const trainer = trainerModel.buildTrainer(connection);
    const records = await mysqlDatabase.getTrainers(trainer)
    mysqlDatabase.closeConnection(connection)
    res.json(records);
})

router.get('/mysql/trainer/:name', async (req, res) => {
    const connection =  await mysqlDatabase.connect()
    const trainer = trainerModel.buildTrainer(connection);
    const character = characterModel.buildCharacter(connection);
    const records = await mysqlDatabase.getTrainerByName(trainer, character ,req.params.name)
    mysqlDatabase.closeConnection(connection)
    res.json(records);
})

router.post('/mysql/trainer', async (req, res) => {
    const formData = req.body;
    const connection = await mysqlDatabase.connect();
    const trainer = trainerModel.buildTrainer(connection);
    const character = characterModel.buildCharacter(connection);
    const newTrainer = await mysqlDatabase.createTrainer(trainer, character, formData);
    mysqlDatabase.closeConnection(connection);
    res.json(newTrainer);
});

router.put('/mysql/trainer', async (req, res) => {
    const connection = await mysqlDatabase.connect();
    const trainer = trainerModel.buildTrainer(connection);
    const character = characterModel.buildCharacter(connection);
    const updatedTrainer = await mysqlDatabase.updateTrainer(
        trainer, 
        req.body[1].trainer_id,
        character, 
        req.body[1].character_character_id, 
        req.body[0]
        );

    mysqlDatabase.closeConnection(connection);
    res.json(updatedTrainer);
});

router.delete('/mysql/trainer', async (req, res) => {
    const connection = await mysqlDatabase.connect();
    const trainer = trainerModel.buildTrainer(connection);
    const character = characterModel.buildCharacter(connection);
    const deletedTrainer = await mysqlDatabase.deleteTrainer(
        trainer, 
        req.body.trainer_id, 
        character, 
        req.body.character_character_id
    );

    mysqlDatabase.closeConnection(connection);
    res.json(deletedTrainer);
});

module.exports = router;