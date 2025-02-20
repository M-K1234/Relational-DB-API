const env = require('dotenv');
env.config();
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require('sequelize')
const password = process.env.MYSQL_PASSWORD;
const username = process.env.MYSQL_USERNAME;
const database = process.env.MYSQL_DATABASE;
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
}
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

const createTrainer = async (trainer, character, characterData) => {

  characterData[0].character_id = uuidv4();
  console.log(characterData[1]);

  await character.create(characterData[0]);

  characterData[1].trainer_id = uuidv4();
  characterData[1].character_character_id = characterData[0].character_id;
  const createdTrainer = await trainer.create(characterData[1]);  

  return createdTrainer;
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

module.exports = {
  createTrainer,
  updateTrainer,
  deleteTrainer,
  connect,
  closeConnection,
  getTrainers,
  getTrainerByName
}

  