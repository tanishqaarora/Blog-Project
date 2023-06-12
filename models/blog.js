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
      Blog.belongsTo(models.user);
    }
  }
  Blog.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 20],
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
    }, {
      sequelize,
      modelName: 'blog',
    });
  return Blog;
};