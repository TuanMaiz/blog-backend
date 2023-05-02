"use strict";
const { Model } = require("sequelize");
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        as: "user_posts",
      });
      this.hasMany(models.Comment, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        as: "user_comments",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // createAt: DataTypes.DATE,
      // updateAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user, options) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword
        },
        beforeUpdate: async (user, options) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword
        }
      }
    }
  );
  return User;
};
