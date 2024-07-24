import userService from "../service/userService";

const handleHello = (req, res) => {
  const name = "Dieu";
  return res.render("home.ejs", { name });
};

const handleUser = async (req, res) => {
  //modle - get data from database
  let userList = await userService.getListUser();
  // console.log("Check user List at Controller: ", userList);
  return res.render("user.ejs", { userList }); //trả ra tên file ejs thì Express tự động biết tìm trong /src/view nhờ cấu hình app.set("views", "./src/views"); ở hàm configViewEngine
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
  let id = req.params.id; // gán param trên url cho biến id
  let user = await userService.getUserById(id); // Kết quả trả về ở file service (rows) là một mảng gán cho mảng user , mà  // hứng kết quả từ truy vấn gán vào biến user
  userData = user; // dùng sequelize có thể trả ra 1 phần tử, k nhất thiết là 1 array

  console.log("check useDate", userData);
  return res.render("update.ejs", { userData });
  // let userData = {};
  // dùng mysql chỉ biết trả về 1 array
  //check đk .length vì khi trả ra mảng rỗng mà ta dùng user lấy phần tử 0 thì bị lỗi
  // if (user && user.length > 0) {
  //   userData = user[0]; // gắn phần tử đầu tiên cho biến object rỗng userData
  // }
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
