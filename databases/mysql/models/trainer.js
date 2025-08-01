const { DataTypes } = require('sequelize');

function buildTrainer(sequelize) {
  const Trainer = sequelize.define('Trainer', {
    trainer_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    level: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    dexterity: DataTypes.INTEGER,
    Intelligence: DataTypes.INTEGER
  },
{
  timestamps: false
});

  // Defer associations until later
  Trainer.associate = (models) => {
    Trainer.hasOne(models.Dog, {
      foreignKey: 'trainer_trainer_id'
    });

    Trainer.hasOne(models.Highscore, {
      foreignKey: 'trainers_trainer_id'
    });

    Trainer.belongsToMany(models.Achievement, {
      through: models.AwardedAchievement
    });
  };

  return Trainer;
}

module.exports = { buildTrainer };
