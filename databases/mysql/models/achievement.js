const { DataTypes } = require('sequelize');

function buildAchievement(connection){

    const Achievement = connection.define(
        'Achievement',
        {
          achievement_id: {
            type: DataTypes.UUID,
            primaryKey: true
          },
          description: {
            type: DataTypes.STRING
          },
          award_title: {
            type: DataTypes.STRING
          },
          trigger_points: {
            type: DataTypes.INTEGER
          }
        },
        {
          timestamps: false
        }
      );

      return Achievement;
}

module.exports = {
    buildAchievement
  };