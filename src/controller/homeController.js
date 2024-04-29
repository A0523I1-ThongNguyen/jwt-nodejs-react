const handleHello = (req,res)=>{
    const name = "Dieu";
    return res.render("home.ejs" ,{name});
}

const handleUser = (req,res) =>{
    //modle - get data from database
    return res.render("user.ejs");//trả ra tên file ejs thì Express tự động biết tìm trong /src/view nhờ cấu hình app.set("views", "./src/views"); ở hàm configViewEngine

}

module.exports ={
    handleHello , handleUser
}