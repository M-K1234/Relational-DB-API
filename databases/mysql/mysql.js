const env = require('dotenv');
env.config();
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('sequelize');
const { get } = require('mongoose');

const password = process.env.MYSQL_PASSWORD;
const username = process.env.MYSQL_USERNAME;
const database = process.env.MYSQL_DATABASE;

const username_read = process.env.MYSQL_READ_USERNAME;
const password_read = process.env.MYSQL_READ_PASSWORD;

const username_insert = process.env.MYSQL_INSERT_USERNAME;
const password_insert = process.env.MYSQL_INSERT_PASSWORD;


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


const getTrainerById = async (Trainer, id) => {
  const trainer = await Trainer.findOne({ where: { trainer_id: id } });
  return trainer;
}

const getTrainers = async (Trainer) => {
  const trainers = await Trainer.findAll();

  return trainers;
}

// uses stored procedure
const createTrainer = async (sequelize, data) => {

    const result =  await sequelize.query(
      `CALL create_trainer_with_dog_and_skills(
        :name, :level, :strength, :dexterity, :intelligence,
        :breed, :trainer_affinity, :dog_name,
        :dog_level, :dog_strength, :dog_dexterity, :dog_intelligence,
        :score
      );`,
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


const updateTrainer = async (Trainer, data) => {
 const updatedTrainer = await Trainer.update(
    {
      name: data.name,
      level: data.level
    },
    {
      where: { trainer_id:  data.trainer_id },
      returning: true
    }
  );

  return updatedTrainer;
}

const deleteSkill = async (SkillStats, body) => {

  const deletedSkill = await SkillStats.destroy({
    where: { dog_fk:  body.dog_fk, skill_fk: body.skill_fk }
  });

  if (deletedSkill === 0) {
    throw new Error('Skill not found or already deleted');
  }

  return 'Skill deleted successfully!';
}

module.exports = {
  createTrainer,
  updateTrainer,
  deleteSkill,
  connect,
  connect_read_only,
  connect_insert_only,
  closeConnection,
  getTrainers,
  getTrainerById
}