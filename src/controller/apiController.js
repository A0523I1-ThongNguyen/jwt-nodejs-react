import loginRegisterService from "../service/loginRegisterService";

const hanlderRegister = async (req, res) => {
  try {
    //create user : call service
    let data = await loginRegisterService.registerNewUser(req.body, res); // req.body = object truyen sang method registerNewUser
    console.log("cc : ", data.EC);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
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
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }

  console.log("check login ", req.body);
};

module.exports = {
  hanlderRegister,
  handleLogin,
};
