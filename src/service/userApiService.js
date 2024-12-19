import { del } from "express/lib/application";
import db from "../models/index";
import user from "../models/user";
import { where } from "sequelize/lib/sequelize";
import {
  checkEmailExist,
  checkPhoneExist,
  hashUserPassword,
} from "./loginRegisterService";

const getAllUser = async () => {
  try {
    let usersData = await db.User.findAll({
      attributes: ["id", "username", "email"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (usersData) {
      console.log("userdata: ", usersData);
      return {
        EM: "get data successfully",
        EC: 0,
        DT: usersData,
      };
    } else {
      return {
        EM: "no data",
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

const createUser = async (data) => {
  try {
    if (!data.email || !data.phone) {
      return {
        EM: "Email and phone are required",
        EC: 1,
        DT: [],
      };
    }

    // Check valid of the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        EM: "Invalid email format",
        EC: 2,
        DT: [],
      };
    }

    // check email exists
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: "Email is already exist",
        EC: -1,
        DT: "email",
      };
    }

    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "Phone is already exist",
        EC: -1,
        DT: "phone",
      };
    }

    //hash password
    const hashPassword = hashUserPassword(data.password);

    // const hashUserPassword = (userPassword) => {
    //   let proHashPass = bcrypt.hashSync(userPassword, salt);
    //   return proHashPass;
    // };

    await db.User.create({ ...data, password: hashPassword });

    return {
      EM: "create user successfully",
      EC: 0,
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      //update
      user.save({});
    } else {
      //not found
    }
  } catch (e) {
    console.log(e);
  }
};

const delUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
      await user.destroy();

      return {
        EM: "Delete successfully",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "User not exist",
        EC: -1,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  delUser,
};
