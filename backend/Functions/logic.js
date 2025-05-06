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
            return res.status(409).json({msg: "Email Already Exist"});
        } else {
            let encrypt_pass = bcrypt.hashSync(password, 16);
            let user_data = new user ({name,email,password : encrypt_pass, age});
            let create_user = await user_data.save();
            res.status(200).json({msg: "User Created Successfully", data: create_user});
        }        
    } catch (error) {
        res.status(501).json({msg: error.message});
    }
   },
   show_data : async function (req, res) {
        try {
            let getUser_data = await user.find().select("-password").sort({"created_at":-1})
            res.status(201).json(getUser_data);
        } catch (error) {
            res.status(501).json({msg: error.message})
        }
   },

   delete_data : async function (req,res) {
        try {
            let {id} = req.params;
            let find_id = await user.findById(id);
            if (find_id) {
                    await user.findByIdAndDelete(find_id);
                    return res.status(200).json({msg: "User Data Has Been Deleted Successfully"})

            }
        } catch (error) {
            res.status(501).json({msg:error.message})
        }
   },

   update_data : async function (req,res) {
    try {
        let {id} = req.params;
        let {name,email,age} = req.body;

        let find_id = await user.findById(id);
        if (find_id) {
            await user.findByIdAndUpdate(id,{name: name,email: email,age: age});
            res.status(200).json({msg: "User Data Has Been Updated Successfully"})
        }
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
   }
}
 
module.exports = all_func;
