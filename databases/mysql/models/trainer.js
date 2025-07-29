const { DataTypes } = require('sequelize');

 function buildTrainer(sequelize)
 {
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
});

Trainer.hasMany(Dog, {
  foreignKey: 'trainer_trainer_id'
});
Trainer.hasMany(Highscore, {
  foreignKey: 'trainers_trainer_id'
});
Trainer.hasMany(AwardedAchievement, { foreignKey: 'trainer_fk' });

      
return Trainer;
}
  
module.exports = {
  buildTrainer
};