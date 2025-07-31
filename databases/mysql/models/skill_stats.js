const { DataTypes } = require('sequelize');

function buildSkillStats(sequelize) {
  const SkillStat = sequelize.define('Skill_Stat', {
    skill_executions: {
      type: DataTypes.STRING(45),
      allowNull: true // or false if required
    }
  });

  // Associate later, after all models are defined
  SkillStat.associate = (models) => {
    // If SkillStat is a join table for Dog <-> DogSkill:
    SkillStat.belongsTo(models.Dog, {
      foreignKey: 'dog_fk'
    });

    SkillStat.belongsTo(models.DogSkill, {
      foreignKey: 'skill_fk'
    });
  };

  return SkillStat;
}

module.exports = {
  buildSkillStats
};
