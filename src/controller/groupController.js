import groupService from "../service/groupService";

const read = async (req, res) => {
  try {
    let data = await groupService.getGroups();
    if (data.EC === 0) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else if (data.EC === 1) {
      return res.status(404).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "error from server (controller)",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  read,
};
