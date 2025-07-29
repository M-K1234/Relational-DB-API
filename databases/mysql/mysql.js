const env = require('dotenv');
env.config();
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('sequelize');
const { get } = require('mongoose');

const password = process.env.MYSQL_PASSWORD;
const username = process.env.MYSQL_USERNAME;
const database = process.env.MYSQL_DATABASE;
const host_read = process.env.MYSQL_READ_HOST;
const port_read = process.env.MYSQL_READ_PORT;
const username_read = process.env.MYSQL_READ_USERNAME;
const password_read = process.env.MYSQL_READ_PASSWORD;
const database_read = process.env.MYSQL_READ_DATABASE;
const host_insert = process.env.MYSQL_INSERT_HOST;
const port_insert = process.env.MYSQL_INSERT_PORT;
const username_insert = process.env.MYSQL_INSERT_USERNAME;
const password_insert = process.env.MYSQL_INSERT_PASSWORD;
const database_insert = process.env.MYSQL_INSERT_DATABASE;


const connect = async () => {
  try {
    const sequelize = new Sequelize(database, username, password, {
      host: 'localhost',
      dialect: 'mysql'
    });
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      return sequelize;
    } catch (error) {
      console.error('Unable to connect to the database: ', error);
      return error;
    }
};

const connect_insert_only = async () => {
  try {
    const sequelize = new Sequelize(database, username_insert, password_insert, {
     host: 'localhost',
      dialect: 'mysql'
    });
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      return sequelize;
    } catch (error) {
      console.error('Unable to connect to the database: ', error);
      return error;
    }
};

const connect_read_only = async () => {
  try {
    const sequelize = new Sequelize(database, username_read, password_read, {
      host: 'localhost',
      dialect: 'mysql'
    });
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      return sequelize;
    } catch (error) {
      console.error('Unable to connect to the database: ', error);
      return error;
    }
};

const closeConnection = (connection) => {
  connection.close()
  console.log('Connection closed')
}

const getCharacterById = async (Character, id) => {
  const character = await Character.findOne({ where: { character_id: id } });
  return character;
}

const getTrainerById = async (Trainer, id) => {
  const trainer = await Trainer.findOne({ where: { trainer_id: id } });
  return trainer;
}

const getTrainers = async (Trainer) => {
  const trainers = await Trainer.findAll();

  return trainers;
}

const getTrainerByName = async (Trainer, Character, name) => {
  const character = await Character.findOne({ where: { name: name } });
  if (!character) {
    return null;
  }
  const trainer = await Trainer.findOne({ where: { character_character_id: character.character_id } });
  return trainer;
}

const createTrainer = async (sequelize, data) => {

    const result =  await sequelize.query(
      `CALL create_trainer_with_dog_and_skills(
        :name, :level, :strength, :dexterity, :intelligence,
        :breed, :trainer_affinity, :dog_name,
        :dog_level, :dog_strength, :dog_dexterity, :dog_intelligence,
        :score
      )`,
      {
        replacements: {
          name: data.name,
          level: data.level,
          strength: data.strength,
          dexterity: data.dexterity,
          intelligence: data.intelligence,
          breed: data.breed,
          trainer_affinity: data.trainer_affinity,
          dog_name: data.dog_name,
          dog_level: data.dog_level,
          dog_strength: data.dog_strength,
          dog_dexterity: data.dog_dexterity,
          dog_intelligence: data.dog_intelligence,
          score: data.score
        }
      }
  );

  return result;
}


const updateTrainer = async (Trainer, trainer_id, character, character_id, updatedData) => {
 
  const trainerToUpdate =  await getTrainerById(Trainer, trainer_id);

  const characterToUpdate = await getCharacterById(character, character_id);
  
  // if (updatedData[0].hasOwnProperty('pet_affinity')) {
    
  // }
console.log(updatedData);
  const updatedTrainer = await characterToUpdate.update(updatedData);
  return updatedTrainer;
}

const deleteTrainer = async (Trainer, trainer_id, Character, character_id) => {
  const deletedEntities = [];
  const deletedTrainer = await Trainer.destroy({
    where: { trainer_id: trainer_id}
  });

  deletedEntities[0] = deletedTrainer;

  const deletedCharacter = await Character.destroy({
    where: { character_id: character_id}
  });
  deletedEntities[1] = deletedCharacter;

  return deletedEntities;
}

const getAchievements = async (Achievement) => {
  const achievements = await Achievement.findAll();
  return achievements;
}

const insertAchievement = async (Achievement, achievementData) => {
  achievementData.achievement_id = uuidv4();
  const createdAchievement = await Achievement.create(achievementData);
  return createdAchievement;
}

// simplified for sake of demo 
const insertAchievementWithProcedure = async (sequelize) => {
 
  const result = await sequelize.query(`CALL dogeverse.sp_insert_achievement
    ('Executed skills 500 times','Pack Leader', 500);`,
    {
      type: Sequelize.QueryTypes.RAW
    }
  );

  return result;
}

module.exports = {
  createTrainer,
  updateTrainer,
  deleteTrainer,
  connect,
  connect_read_only,
  connect_insert_only,
  closeConnection,
  getTrainers,
  getTrainerByName,
  insertAchievementWithProcedure,
  getAchievements,
  insertAchievement
}

  