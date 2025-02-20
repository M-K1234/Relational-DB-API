const { DataTypes } = require('sequelize');

function buildDog(connection){
    const Dog = connection.define(
        'Dog',
        {
          dog_id: {
            type: DataTypes.UUID
          },
          trainer_trainer_id: {
            type: DataTypes.UUID
          },
          pet_dog_stat_id: {
            type: DataTypes.UUID
          },
          breed: {
            type: DataTypes.STRING
          },
          affinity: {
            type: DataTypes.INTEGER
          }
        },
        {
          timestamps: false
        }
      );

      return Dog;
}

  module.exports = {
    buildDog
  };