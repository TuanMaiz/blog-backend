const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.User;
const Op = db.Sequelize.Op;
require("dotenv").config();

exports.create = async (req, res) => {
  //check if user exist
  const { email, password } = req.body;
  const userExist = await User.findOne({
    where: {
      email: email,
    },
  });
  if (userExist) {
    res.status(401).json({ message: "User already exist" });
  } else {
    //create new user
    try {
      await User.create({
        ...req.body,
      });
      res
        .status(201)
        .json({ message: `New user ${req.body.firstName} created` });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
exports.login = async (req, res) => {
  // check user(email) and password. If true, provide with access token
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    //if user not exist
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    //if password not match
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    // Send the token and user data in response
    delete user.dataValues.password // to not send password along with response
    res.status(200).json({ user,token });
  } catch (error) {
    console.error(error);
  }
};
exports.findAll = async (req, res) => {
  const users = await User.findAll();
  res.send(users);
};

exports.findOne = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.send(user);
};

exports.update = async (req, res) => {
  try {
    if (req.body.password) {
      //check if password udpate
      //check if new password is the same to the old password
      const oldPassword = await User.findByPk(req.params.id, {
        //get only password of specified Id
        attributes: ["password"],
      });

      // if no match then we allow user to update their password
      const match =
        oldPassword.dataValues.password === req.body.password ? true : false;
      if (!match) {
        await User.update(
          {
            ...req.body,
            password: hashedPassword,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
        res.status(200).json({
          success: true,
          message: `Update password for user id ${req.params.id} successfully`,
        });
      } else {
        res.status(400).json({
          success: false,
          message: `New password must not be the same with old password`,
        });
      }
    } else {
      //new info -> check null -> update
      const newInfo = req.body;
      await User.update(
        { ...newInfo },
        {
          where: {
            id: req.params.id,
          },
        }
      );
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteOne = async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send(`Delete User with id ${req.params.id}`);
};

exports.deleteAll = (req, res) => {};
