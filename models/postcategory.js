"use strict";
const { Model } = require("sequelize");
const {Post} = require("./post")
const {Category} = require('./category')
module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostCategory.init(
    {

    },
    {
      sequelize,
      modelName: "PostCategory",
    }
  );
  return PostCategory;
};
