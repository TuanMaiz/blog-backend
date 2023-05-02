"use strict";
const { Model } = require("sequelize");
const slugify = require('slugify');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false
        },
        as: 'author'
      })
      this.hasMany(models.Comment, {
        foreignKey: {
          name: "postId",
          allowNull: false
        },
        as: 'comments'
      })
      this.belongsToMany(models.Category, {
        through: models.PostCategory
      })
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true
      },
      views_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
      },
      likes_count:{
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
      },
      comments_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0
      }
    },

    {
      sequelize,
      modelName: "Post",
      hooks: {
        beforeCreate: (post, options) => {
          const length = 10
          const randomString = Math.random().toString(36).substring(2, length + 2)
          const rawSlug = post.title + ' ' + randomString
          post.slug = slugify(rawSlug, { remove: /[*+~.()'"!:@]/g, lower: true });
        }
      }
    }
  );
  return Post;
};
