const { DataTypes } = require('sequelize');

function buildDog(sequelize) {
  const Dog = sequelize.define('Dog', {
    dog_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true
    },
    trainer_trainer_id: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    trainer_affinity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: DataTypes.STRING(45),
    level: DataTypes.INTEGER,
    strength: DataTypes.INTEGER,
    dexterity: DataTypes.INTEGER,
    intelligence: DataTypes.INTEGER
  });

  // Define associations later
  Dog.associate = (models) => {
    Dog.belongsToMany(models.DogSkill, { through: models.SkillStat });

    Dog.belongsTo(models.Trainer, {
      foreignKey: 'trainer_trainer_id'
    });
  };

  return Dog;
}

module.exports = {
  buildDog
};
