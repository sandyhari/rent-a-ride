const express = require('express');
const User = require("../models/userModel");

const { compareHash } = require("../services/hashing");
const { userTokenGenerator } = require("../services/jwt_service");

const UserRouter = express.Router();

UserRouter.post("/", async (req,res) => {
    try{
        const {email,password} = req.body;
        const AuthorisedUser = User.findOne({email}.exec());
        if(AuthorisedUser){
            const result = await compareHash(password,AuthorisedUser.passwordHash);
            if(result){
               const token =  userTokenGenerator(AuthorisedUser.email);
               res.cookie("jwt", token, {
                httpOnly: true,
                secure: true
              });
              res.status(200).json({
                status: "SUCCESS",
                token
              });
            }
            else{
                res.status(400).send("Invalid User");
            }
        }
        else{
            res.status(400).send("Invalid User");
        }
    }
    catch{
        console.error();
        res.status(500).send("Internal server Error.");
    }
})

module.exports = UserRouter;