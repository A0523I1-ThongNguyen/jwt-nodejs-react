const handleHello = (req,res)=>{
    const name = "Dieu";
    return res.render("home.ejs" ,{name});
}

const handleUser = (req,res) =>{
    //modle - get data from database
    return res.render("user.ejs");
}

module.exports ={
    handleHello , handleUser
}