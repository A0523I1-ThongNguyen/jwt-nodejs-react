import { del } from "express/lib/application";
import db from "../models/index";
import user from "../models/user";

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

const createUser = () => {};

const updateUSer = () => {};

const delUser = () => {};

module.exports = {
  getAllUser,
  createUser,
  updateUSer,
  delUser,
};
