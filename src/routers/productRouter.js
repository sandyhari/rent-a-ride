const express = require('express');
const ProductsModel = require("../models/productsModel");
const UserModel = require("../models/userModel");
const userModel = require('../models/userModel');
const ProductRouter = express.Router();
const ObjectId = require('mongoose').Types.ObjectId; 

ProductRouter
.get("/", async (req,res)=>{
    try{
        const result = await ProductsModel.find({}).exec();
            if(result){
                res.status(200).json({result});
            }
            else{
                res.status(500).send("Internal Server Error.")
            }
    }
    catch{
        console.error();
        res.status(500).send("Internal Server Error.")
    }
})
.get("/:id",async (req,res)=>{
    try{
        let {id} = req.params;
        id = new ObjectId(id);
        const item = await ProductsModel.findById({id}).exec();
        if(item){
            res.status(200).json({item});
        }
        else{
            res.status(500).send("Internal Server Error.")
        }
    }catch{
        console.error();
        res.status(500).send("Internal Server Error.")
    }
})
.put("/:userid", async (req, res) => {
    try {
      const { userid } = req.params;
      console.log("updateing:", userid);
      let item = new UserModel({
        basket: req.body.basket,
        productidinbasket: req.body.productidinbasket,
        _id: userid //This is required, or a new ID will be assigned!
      });

      await userModel.findByIdAndUpdate(userid, item, {}, function (err) {
        if (err) {
          console.error();
          res.status(500).send("Error in updation ");
        }
        console.log("Successfully updated");
        res.status(200).send("Successfully updated");
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  })

//admin --- usage --- only
.post("/",async (req,res)=>{
    try {
        const { vehicleName, vehicleImgURL, RentalPrice, Count,status } = req.body;
        let Exists = await ProductsModel.findOne({ vehicleName });
        if (Exists) {
          res.status(401).json({msg: "We already have a bike with this name"});
        } else {
          const newproductdetails = await new ProductsModel({
            vehicleName,
            vehicleImgURL,
            RentalPrice,
            Count,
            status
          }).save();
          console.log(newproductdetails);
          res.status(200).json({
            newproductdetails
          });
        }
      } catch (e) {
        console.error(e);
        res
          .status(500)
          .send("Internal Server Error occurred while registering the User..!");
      }
})
module.exports = ProductRouter;