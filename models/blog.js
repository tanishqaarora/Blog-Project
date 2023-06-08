'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.hasMany(models.comment, {
        foreignKey: 'blogId'
      });
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'blog',
    });
  return Blog;
};