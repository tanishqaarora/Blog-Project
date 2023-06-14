'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reaction_Category.hasMany(models.reaction, {
        foreignKey: 'reactionId'
      })
    }
  }
  Reaction_Category.init({
    reaction_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reaction_category',
  });
  return Reaction_Category;
};