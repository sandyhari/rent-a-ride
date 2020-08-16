const express = require('express');
const Products = require("../models/productsModel");

const ProductRouter = express.Router();

ProductRouter
.get("/", async (req,res)=>{
    try{
        const result = await Products.find({}).exec();
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
        const {id} = req.params;
        const item = await Products.findById({id}).exec();
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

module.exports = ProductRouter;