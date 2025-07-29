const { DataTypes } = require('sequelize');

function buildAchievement(sequelize){

    const Achievement = sequelize.define('Achievement', {
  achievement_id: {
    type: DataTypes.CHAR(36),
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  award_title: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  trigger_points: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
Achievement.hasMany(AwardedAchievement, { foreignKey: 'achievement_fk' });

      return Achievement;
}

module.exports = {
    buildAchievement
  };