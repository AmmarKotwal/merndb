let exp = require("express");
let routes = exp.Router()
let func = require("../Functions/logic")

routes.get("/",func.Home);

module.exports = routes
