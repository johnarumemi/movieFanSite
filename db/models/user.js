'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      comment: "this is a comment for this id column of books table",
    },

    name: {
      type:DataTypes.STRING,
      allowNull: false,
      comment: "this is the user name extracted from github for this user"
    },

    github_id: {
      type:DataTypes.STRING,
      allowNull: false,
      comment: "this is the unique github id for this user",
      unique: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};