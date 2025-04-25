let user = require("../Collections/user")
let bcrypt = require("bcrypt")

let all_func = {

    Home : async function (req,res) {
       res.send("Home Page");
       res.end();
   },
   register_user : async function (req,res) {
    try {
        let {name,email,password,age} = req.body;
        let checkEmail = await user.findOne({email: email})
        if (checkEmail) {
            return res.status(409).json({msg: "User Created Successfully"});
        } else {
            let encrypt_pass = bcrypt.hashSync(password, 16);
            let user_data = new user ({name,email,password : encrypt_pass, age});
            let create_user = await user_data.save();
            res.status(200).json({msg: "User Created Successfully", data: create_user});
        }        
    } catch (error) {
        res.status(501).json({msg: error.message});
    }
   }
}
 
module.exports = all_func;
