'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reaction.belongsTo(models.user);
      Reaction.belongsTo(models.blog);
      Reaction.belongsTo(models.comment);
    }
  }
  Reaction.init({
    userId: DataTypes.INTEGER,
    blogId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reaction',
  });
  return Reaction;
};