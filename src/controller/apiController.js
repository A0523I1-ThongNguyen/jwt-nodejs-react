import loginRegisterService from "../service/loginRegisterService";

const apime = (req, res) => {
  return res.status(200).json({
    message: "ok nhe",
    data: "list works",
  });
};

const hanlderRegister = async (req, res) => {
  try {
    //create user : call service
    let data = await loginRegisterService.registerNewUser(req.body, res); // req.body = object truyen sang method registerNewUser
    console.log("cc : ", data.EC);

    return res.status(200).json({
      EM: data.EM, //error massage
      EC: data.EC, //error code
      DT: "", //data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server", //error massage
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let dataDB = await loginRegisterService.loginUser(req.body);

    return res.status(200).json({
      EM: dataDB.EM,
      EC: dataDB.EC,
      DT: dataDB.DT,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server", //error massage
      EC: "-1", //error code
      DT: "", //data
    });
  }

  console.log("check login ", req.body);
};

module.exports = {
  apime,
  hanlderRegister,
  handleLogin,
};
