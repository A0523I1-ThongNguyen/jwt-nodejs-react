import userService from "../service/userService";

const handleHello = (req, res) => {
  const name = "Dieu";
  return res.render("home.ejs", { name });
};

const handleUser = async(req, res) => {
  //modle - get data from database
   let userList = await userService.getListUser();
   console.log("Check user List at Controller: ", userList);
  return res.render("user.ejs", {userList}); //trả ra tên file ejs thì Express tự động biết tìm trong /src/view nhờ cấu hình app.set("views", "./src/views"); ở hàm configViewEngine
};


const handleCreate = (req, res) => {
  let email = req.body.email;
  let password = req.body.password2;
  let username = req.body.username;

  userService.createUser(email, password, username);

  return res.send("Page Create");
};

module.exports = {
  handleHello,
  handleUser,
  handleCreate,
};
