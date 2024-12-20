import userService from "../service/userService";

const handleHello = (req, res) => {
  const name = "Hello";
  return res.render("home.ejs", { name });
};

const handleUser = async (req, res) => {
  //modle - get data from database
  let userList = await userService.getListUser();
  return res.render("user.ejs", { userList }); // Return the file name of ejs, Express auto knows to look in the /src/views directory thanks to the config app.set("views", "./src/views"); in the configViewEngine function.
};

const handleCreate = (req, res) => {
  let email = req.body.email;
  let password = req.body.password2;
  let username = req.body.username;

  userService.createUser(email, password, username);
  return res.redirect("/user");
};

const handleDelete = async (req, res) => {
  console.log(">check id: ", req.params.id);
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdatePage = async (req, res) => {
  let userData = {};
  let id = req.params.id;
  let user = await userService.getUserById(id);
  userData = user;

  console.log("check useDate", userData);
  return res.render("update.ejs", { userData });
};

const handleUpdate = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  console.log("check body", req.body);
  await userService.updateUserInfo(email, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHello,
  handleUser,
  handleCreate,
  handleDelete,
  getUpdatePage,
  handleUpdate,
};
