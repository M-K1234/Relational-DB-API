const { DataTypes } = require('sequelize');

function buildSkillStats(sequelize){
    
  const SkillStat = sequelize.define('SkillStat', {
  skill_executions: DataTypes.STRING(45)
});
SkillStat.belongsTo(Dog, { foreignKey: 'dog_fk' });
SkillStat.belongsTo(DogSkill, { foreignKey: 'skill_fk' });

      return SkillStat;
  }

  module.exports = {
    buildSkillStats 
  };