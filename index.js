const dotenv = require('dotenv');
dotenv.config();
require("./src/config/dbConfig");
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ProductsRouter = require("./src/routers/productRouter");
const UserRouter = require("./src/routers/userRouter");
const SignupRouter = require("./src/routers/signupRouter");

const PORTVAL = process.env.PORT || 8649;

app.use(bodyParser.json()); //body request handlers 
app.use(cookieParser()); //cookie maintainer
app.use(cors()); //cors effect creator.
app.use(bodyParser.urlencoded({ 
    extended: true
})); 

app.get("/",(req,res)=>{
res.status(200).send("Rent a Bikeie");
})

app.use("/user/login",UserRouter);
app.use("/user/signup",SignupRouter);
app.use("/products",ProductsRouter);


app.listen(PORTVAL,()=>{console.log(`Listening from the ${PORTVAL}`)});