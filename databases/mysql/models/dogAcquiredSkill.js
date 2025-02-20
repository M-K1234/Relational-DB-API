const { DataTypes } = require('sequelize');

function buildDogAcquiredSkill(connection){
    const DogAcquiredSkill = connection.define(
        'Dog_Acquired_Skill',
        {
          dog_dog_id: {
            type: DataTypes.UUID
          },
          skill_entity_id: {
            type: DataTypes.UUID
          },
          skill_executions: {
            type: DataTypes.INTEGER
          }
        },
        {
          timestamps: false
        }
      );
  
      return DogAcquiredSkill;
  }

  module.exports = {
    buildDogAcquiredSkill
  };