const express = require("express");
const bookingsRouter = express.Router();


const UserModel = require("../models/userModel");

bookingsRouter.get("/:id", async(req,res)=>{


    const {id} = req.params;


})




module.exports = bookingsRouter;