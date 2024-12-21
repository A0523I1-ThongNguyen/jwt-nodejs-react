import { del } from "express/lib/application";
import db from "../models/index";
import user from "../models/user";
import { where } from "sequelize/lib/sequelize";
import {
  checkEmailExist,
  checkPhoneExist,
  hashUserPassword,
} from "./loginRegisterService";

const checkIdExist = async (id) => {
  let idUser = await db.User.findOne({
    where: { id: id },
  });
  if (idUser) {
    return true;
  }
  return false;
};

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
        EM: "not found data",
        EC: 1,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrongs with services",
      EC: -1,
      DT: [],
    };
  }
};

const createUser = async (data) => {
  try {
    let isIdExist = await checkIdExist(data.id);
    if (isIdExist) {
      return {
        EM: "Duplicate entry id: " + data.id,
        EC: 2,
        DT: "",
      };
    }

    if (!data.email || !data.phone || !data.password) {
      return {
        EM: "Email and phone and password are required",
        EC: 2,
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
        EC: 2,
        DT: "email",
      };
    }

    const phoneRegex = /^0\d{9,10}$/;
    if (!phoneRegex.test(data.phone)) {
      return {
        EM: "Invalid phone format",
        EC: 2,
        DT: "",
      };
    }

    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "Phone is already exist",
        EC: 2,
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
      EC: -1,
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    if (!data.email || !data.phone || !data.password) {
      return {
        EM: "Email and phone and password are required",
        EC: 2,
        DT: [],
      };
    }

    // Check valid of the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        EM: "Invalid email format",
        EC: 2,
        DT: "",
      };
    }

    const phoneRegex = /^0\d{9,10}$/;
    if (!phoneRegex.test(data.phone)) {
      return {
        EM: "Invalid phone format",
        EC: 2,
        DT: "",
      };
    }

    //hash password
    const hashPassword = hashUserPassword(data.password);

    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      await user.update(
        {
          username: data.username,
          phone: data.phone,
          email: data.email,
          groupId: data.groupId,
          password: hashPassword,
        },
        {
          where: { id: data.id },
        }
      );
      return {
        EM: "Update successfully",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "User not found",
        EC: 1,
        DT: "",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "Error with service",
      EC: -1,
      DT: "",
    };
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
        EM: "Delete successfully with id: " + id,
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Id user not found",
        EC: 1,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "error from service",
      EC: -1,
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
