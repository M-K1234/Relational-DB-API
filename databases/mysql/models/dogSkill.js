  const { DataTypes } = require('sequelize');
  function buildDogSkill(sequelize){
    
    const DogSkill = sequelize.define('DogSkill', {
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


      return DogSkill;
  }
  
  module.exports = {
    buildDogSkill
  };