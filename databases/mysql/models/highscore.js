const { DataTypes } = require('sequelize');

function buildHighscore(sequelize) {
  const Highscore = sequelize.define('Highscore', {
    highscore_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  // Associate later, after all models are defined
  Highscore.associate = (models) => {
    Highscore.belongsTo(models.Trainer, {
      foreignKey: {
        name: 'trainers_trainer_id',
        allowNull: false
      }
    });
  };

  return Highscore;
}

module.exports = {
  buildHighscore
};
