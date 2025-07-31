const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const getTrainers = async (Model) => {
    return await Model.find();  
};

const getTrainerById = async (Model , id) => {
    return await Model.findById(id);
};


const createTrainer = async (Model, character_id, data) => {
    const trainer = new Model(data);
    trainer.character_id = character_id;
    return await trainer.save();
};

const getDogs = async () => {
    return await Dog.find();
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


module.exports = {
    getDogs,
    connectMongo,
    closeMongoConnection,
    getTrainerById,
     getTrainers, 
    createTrainer
};
