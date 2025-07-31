const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const Trainer = new Schema({
    _id: { type: String, default: uuidv4 },
    name: String,
    level: Number,
    strength: Number,
    dexterity: Number,
    intelligence: Number
}
);

const TrainerModel = mongoose.model('Trainer', Trainer);

module.exports = {
    TrainerModel
}