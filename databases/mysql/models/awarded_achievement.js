const { DataTypes } = require('sequelize');

function buildAwardedAchievement(sequelize) {
  const AwardedAchievement = sequelize.define(
    'AwardedAchievement',
    {}, // join table has no extra fields for now
    { timestamps: false }
  );

  // Associations will be defined later
  AwardedAchievement.associate = (models) => {
    AwardedAchievement.belongsTo(models.Trainer, {
      foreignKey: 'trainer_fk'
    });

    AwardedAchievement.belongsTo(models.Achievement, {
      foreignKey: 'achievement_fk'
    });
  };

  return AwardedAchievement;
}

module.exports = {
  buildAwardedAchievement
};
