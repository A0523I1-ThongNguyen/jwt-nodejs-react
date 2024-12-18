import userApiService from "../service/userApiService";

const read = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
    return res.status(200).json({
      EM: data.EM, //error massage
      EC: data.EC, //error code
      DT: data, //data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server", //error massage
      EC: "-1", //error code
      DT: "", //data
    });
    console.log(e);
  }
};

const create = (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server", //error massage
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const update = (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server", //error massage
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const del = (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server", //error massage
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

module.exports = {
  read,
  create,
  update,
  del,
};