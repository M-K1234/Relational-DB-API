const { DataTypes } = require('sequelize');


function buildAwardedAchievement(sequelize) {
  
  const AwardedAchievement = sequelize.define('AwardedAchievement', {}, { timestamps: false });
  
AwardedAchievement.belongsTo(Trainer, { foreignKey: 'trainer_fk' });
AwardedAchievement.belongsTo(Achievement, { foreignKey: 'achievement_fk' });

  return AwardedAchievement;
}


  module.exports = {
    buildAwardedAchievement
  };