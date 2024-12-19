import groupService from "../service/groupService";

const read = async (req, res) => {
  try {
    let data = await groupService.getGroups();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
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
  read,
};
