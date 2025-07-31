const env = require('dotenv');
env.config();
const express = require('express');
const mysqlDatabase = require('../../databases/mysql/mysql');

const Achievement = require('../../databases/mysql/models/achievement');
const dog = require('../../databases/mysql/models/dog');
const skill_stat = require('../../databases/mysql/models/skill_stats');
const dogSkill =    require('../../databases/mysql/models/dogSkill');
const trainer = require('../../databases/mysql/models/trainer');
const highscore = require('../../databases/mysql/models/highscore');
const awardedAchievement = require('../../databases/mysql/models/awarded_achievement');

const router = express.Router();

// routes
router.get('/mysql/trainers', async (req, res) => {
    const connection =  await mysqlDatabase.connect()
    const Trainer = trainer.buildTrainer(connection);
    Trainer.associate({Dog: dog.buildDog(connection), Highscore: highscore.buildHighscore(connection), Achievement: Achievement.buildAchievement(connection), AwardedAchievement: awardedAchievement.buildAwardedAchievement(connection)});
    const records = await mysqlDatabase.getTrainers(Trainer);
    mysqlDatabase.closeConnection(connection)
    res.json(records);
})

router.get('/mysql/trainer/:id', async (req, res) => {
    const connection =  await mysqlDatabase.connect()
    const Trainer = trainer.buildTrainer(connection);
    Trainer.associate({Dog: dog.buildDog(connection), Highscore: highscore.buildHighscore(connection), Achievement: Achievement.buildAchievement(connection), AwardedAchievement: awardedAchievement.buildAwardedAchievement(connection)});
    const records = await mysqlDatabase.getTrainerById(Trainer, req.params.id)
    mysqlDatabase.closeConnection(connection)
    res.json(records);
})

router.post('/mysql/trainer', async (req, res) => {

    const connection = await mysqlDatabase.connect();
    const newTrainer = await mysqlDatabase.createTrainer(connection, req.body);
    mysqlDatabase.closeConnection(connection);
    
    res.json(newTrainer);
});

router.put('/mysql/trainer', async (req, res) => {
    const connection = await mysqlDatabase.connect();
    const Trainer = trainer.buildTrainer(connection);
    const updatedTrainer = await mysqlDatabase.updateTrainer(Trainer, req.body);
    mysqlDatabase.closeConnection(connection);
    res.json(updatedTrainer);
});

router.delete('/mysql/skillStats', async (req, res) => {
    const connection = await mysqlDatabase.connect();
    const SkillStats = skill_stat.buildSkillStats(connection);
    const deletedSkill = await mysqlDatabase.deleteSkill(SkillStats, req.body);
    mysqlDatabase.closeConnection(connection);
    res.json(deletedSkill);
});

router.get('/mysql/achievements/read', async (req, res) => {
    const connection_read = await mysqlDatabase.connect_read_only();
    const achievement = achievementModel.buildAchievement(connection_read);
    const achievementData = await mysqlDatabase.getAchievements(achievement);
    mysqlDatabase.closeConnection(connection_read);
    res.json(achievementData);
});

router.post('/mysql/achievements/insert', async (req, res) => {
    const formData = req.body;
    const connection_insert = await mysqlDatabase.connect_insert_only();
    const achievement = achievementModel.buildAchievement(connection_insert);
    const newAchievement = await mysqlDatabase.insertAchievement(achievement, formData);
    mysqlDatabase.closeConnection(connection_insert);
    res.json(newAchievement);
});

// routes end ----------

module.exports = router;