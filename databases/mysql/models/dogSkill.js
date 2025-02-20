  const { DataTypes } = require('sequelize');
  function buildDogSkill(connection){
    const DogSkill = connection.define(
        'Dog_Skill',
        {
          dog_skill_id: {
            type: DataTypes.UUID,
            primaryKey: true
          },
          damage: {
            type: DataTypes.INTEGER
          },
          description: {
            type: DataTypes.STRING
          },
          name: {
            type: DataTypes.STRING
          },
          attack_type: {
            type: DataTypes.STRING
          }
        },
        {
          timestamps: false
        }
      );

      return DogSkill;
  }
  
  module.exports = {
    buildDogSkill
  };