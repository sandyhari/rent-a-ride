const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SignupRouter = express.Router();

const UserModel = require("../models/userModel");


SignupRouter.post(
    "/", async (req, res) => {
        const {username, email, password} = req.body;
        const arrayObj = req.body.productidinbasket === "undefined"?[]:req.body.productidinbasket;
        console.log(username);
        console.log(typeof arrayObj);
        try {
            let user = await UserModel.findOne({
                email
            });
            if (user) {
                return res.status(400).send("User Already Exists");
            }

            user = new UserModel ({
                username : username,
                email: email,
                passwordHash: password,
                productidinbasket:arrayObj
            });

            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_KEY, {
                    expiresIn: "1 hour"
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

module.exports = SignupRouter;
