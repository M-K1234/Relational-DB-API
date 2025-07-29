const { DataTypes } = require('sequelize');

function buildHighscore(sequelize)
{
    const Highscore = sequelize.define('Highscore', {
  highscore_id: {
    type: DataTypes.CHAR(36),
    primaryKey: true
  },
  score: DataTypes.INTEGER
}, {
  timestamps: false
});

Highscore.belongsTo(Trainer, {
  foreignKey: 'trainers_trainer_id',
  primaryKey: true
});

    return Highscore;
}

  module.exports = {
    buildHighscore
  };