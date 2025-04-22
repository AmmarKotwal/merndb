let user = require("../Collections/user")

let all_func = {

    Home : async function (req,res) {
       res.send("Home Page");
       res.end();
   },
   register_user : async function (req,res) {
    try {
        let user_data = new user(req.body);
        let create_user = await user_data.save();
        res.status(200).json({msg: "User Created Successfully", data: create_user});
    } catch (error) {
        res.status(501).json({msg: error.message});
    }
   }
}
 
module.exports = all_func;
