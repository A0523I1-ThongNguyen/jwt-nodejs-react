import db from "../models/index";
import user from "../models/user";
const getGroups = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["id", "ASC"]],
    });

    if (data) {
      return {
        EM: "get Group successfully",
        EC: 0,
        DT: data,
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
      EM: "error from service group",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  getGroups,
};
