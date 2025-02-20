const { DataTypes } = require('sequelize');

 function buildTrainer(connection)
 {
    const Trainer = connection.define(
        'Trainer',
        {
          trainer_id: {
            type: DataTypes.UUID,
            primaryKey: true
          },
          character_character_id: {
            type: DataTypes.UUID
          },
          pet_affinity: {
            type: DataTypes.INTEGER
          }
        },
        {
          timestamps: false
        }
      );

      return Trainer;
 }
 
 

  module.exports = {
    buildTrainer
  };