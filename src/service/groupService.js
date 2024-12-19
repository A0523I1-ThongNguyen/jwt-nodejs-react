import db from "../models/index";
const getGroups = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["id", "ASC"]],
    });

    return {
      EM: "get Group successfully",
      EC: 0,
      DT: data,
    };
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
