import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { Op } from "sequelize";
import { where } from "sequelize/dist/index.js";

const salt = bcrypt.genSaltSync(10);

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }

  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  }

  return false;
};

// Hash Password
const hashUserPassword = (userPassword) => {
  let proHashPass = bcrypt.hashSync(userPassword, salt);
  return proHashPass;
};

//check input password vs password at Database
const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

// Method Create
const registerNewUser = async (rawUserData, res) => {
  //rawUserData = req.body from file apiController
  let flag = false;
  try {
    // check case value k dc truyền lên
    if (!rawUserData.email || !rawUserData.phone || !rawUserData.password) {
      return {
        EM: "thiếu giá trị tham số truyền lên cho server", //error massage
        EC: -1, //error code
        DT: "", //data
      };
    }
    cxzxx;
    //check email/phone are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "Email is already exist",
        EC: -1,
      };
    }

    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "Phone is alreay exist",
        EC: -1,
      };
    }

    // check độ dài password
    if (rawUserData.password && rawUserData.password.length <= 3) {
      return {
        EM: "Độ dài Password tối thiểu là 3 kí tự",
        EC: -1,
        DT: "",
      };
    }

    //hash password
    let password = hashUserPassword(rawUserData.password);

    //call db to create new user
    await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      username: rawUserData.userName,
      password: password,
    });

    return {
      EM: "The User Created Successfully!",
      EC: 0,
    };
  } catch (e) {
    console.log("=> error in service: ", e);
    return res.status(500).json({
      EM: "Something error in service",
      EC: 1,
    });
  }
};

const loginUser = async (rawData) => {
  try {
    console.log(">>Input user email/phone number: ", rawData.valueLogin);
    console.log(">>>Input found user password: ", rawData.valuePassword);
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user) {
      console.log("Found User: ", user.get({ plain: true }));
      let isCorrectPassword = checkPassword(
        rawData.valuePassword,
        user.password
      );
      if (isCorrectPassword === true) {
        return {
          EM: "Ok!",
          EC: 0,
          DT: "",
        };
      }
    }
    console.log(">>Case : Not found User or Wrong Password");
    return {
      EM: "Your email/phone number or password is wrong!",
      EC: -1,
      DT: "",
    };
    // console.log("check user JS: ", user.get({ plain: true }));
    // console.log("check user sequelize  : ", user.dataValues);
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrongs in Service", //error massage
      EC: -1, //error code
    };
  }
};

module.exports = {
  registerNewUser,
  loginUser,
};
