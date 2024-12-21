import userApiService from "../service/userApiService";

const read = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
    if (data.EC === 0) {
      return res.status(200).json({
        EM: data.EM, //error massage
        EC: data.EC, //error code
        DT: data.DT, //data
      });
    } else if (data.EC === 1) {
      return res.status(404).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      return res.status(500).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from controller",
      EC: "-1",
      DT: "",
    });
  }
};

const create = async (req, res) => {
  try {
    let data = await userApiService.createUser(req.body);
    if (data.EC === 0) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else if (data.EC === 2) {
      return res.status(400).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      return res.status(500).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from controller",
      EC: "-1",
      DT: "",
    });
  }
};

const update = async (req, res) => {
  try {
    let data = await userApiService.updateUser(req.body);
    if (data.EC === 0) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else if (data.EC === 2) {
      return res.status(400).json({
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
    } else {
      return res.status(500).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server (controller)",
      EC: "-1",
      DT: "",
    });
  }
};

const del = async (req, res) => {
  try {
    let data = await userApiService.delUser(req.params.id);
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
    return res.status(500).json({
      EM: "error from controller",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  read,
  create,
  update,
  del,
};
