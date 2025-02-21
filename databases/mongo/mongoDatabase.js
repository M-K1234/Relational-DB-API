const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const getTrainers = async (Model) => {
    return await Model.find();  
};

const getCharacters = async (Model) => {
    return await Model.find();
};
const getTrainerById = async (Model , id) => {
    return await Model.findById(id);
};

const getCharacterById = async (Model, id) => {
    return await Model.findById(id);
};

const updateCharacter = async (id, characterData) => {
    return await Character.findByIdAndUpdate(id, characterData, { new: true });
};

const deleteCharacter = async (id) => {
    return await Character.findByIdAndDelete(id);
};

const createCharacter = async (Model, data) => {

    return await Model.create(data);
};
const createTrainer = async (Model, character_id, data) => {
    const trainer = new Model(data);
    trainer.character_id = character_id;
    return await trainer.save();
};

const getDogs = async () => {
    return await Dog.find();
};

const getDogById = async (id) => {
    return await Dog.findById(id);
};

const updateDog = async (id, dogData) => {
    return await Dog.findByIdAndUpdate(id, dogData, { new: true });
};

const deleteDog = async (id) => {
    return await Dog.findByIdAndDelete(id);
};

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};
const closeMongoConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed successfully');
    } catch (err) {
        console.error('Failed to close MongoDB connection', err);
    }
};

const createDog = async (dogData) => {
    const dog = new Dog(dogData);
    return await dog.save();
};

module.exports = {
    createCharacter,
    getCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter,
    createDog,
    getDogs,
    getDogById,
    updateDog,
    deleteDog,
    connectMongo,
    closeMongoConnection,
    getTrainerById,
     getTrainers, 
    createTrainer
};
