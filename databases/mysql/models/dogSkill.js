const { DataTypes } = require('sequelize');

function buildDogSkill(sequelize) {
  const DogSkill = sequelize.define('Dog_Skill', {
    dog_skill_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true
    },
    damage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    attack_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lvl_unlock: DataTypes.INTEGER,
    starting_skill: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  // Add an "associate" method so associations can be set later
  DogSkill.associate = (models) => {
    DogSkill.belongsToMany(models.Dog, { through: models.SkillStat });
  };

  return DogSkill;
}

module.exports = { buildDogSkill };
