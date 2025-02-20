const { DataTypes } = require('sequelize');

function buildCharacter(connection){

    const Character = connection.define(
        'Character',
        {
          character_id: {
            type: DataTypes.UUID,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING
          },
          level: {
            type: DataTypes.INTEGER
          },
          strength: {
            type: DataTypes.INTEGER
          },
          dexterity: {
            type: DataTypes.INTEGER
          },
          intelligence: {
            type: DataTypes.INTEGER
          }
        },
        {
          timestamps: false
        }
      );

      return Character;
}

module.exports = {
    buildCharacter
  };