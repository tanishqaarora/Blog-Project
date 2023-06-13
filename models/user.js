'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.blog, {
        foreignKey: 'userId'
      });
      User.hasMany(models.comment, {
        foreignKey: 'userId'
      });
      User.hasMany(models.reaction, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 10,
      min: 6,
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};