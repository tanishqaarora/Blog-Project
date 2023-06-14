'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog_Category.hasMany(models.blog, {
        foreignKey: 'blogCategoryId'
      });
    }
  }
  Blog_Category.init({
    blog_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'blog_category',
  });
  return Blog_Category;
};