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
const Razorpay = require("razorpay");
const PORTVAL = process.env.PORT || 8649;

const instance = new Razorpay({
    key_id: "rzp_test_na9KTMUAioqZx5",
    key_secret: "IvX5IWluj4FkS1qyB8BTIGRV",
});

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

app.post("/order", (req, res) => {
    try {
      const params = req.body;
      console.log("order",params);
      console.log(typeof params);
    instance.orders.create(params, async function (err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
      console.log(order)
    return res.status(200).json(order);
   });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
   }
  });

  app.post("/capture/:paymentId", (req, res) => {
    try {
      console.log(req.params.paymentId);
      return request(
       {
       method: "POST",
       url: `https://rzp_test_na9KTMUAioqZx5:IvX5IWluj4FkS1qyB8BTIGRV@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
       form: {
          amount: 10 * 100, // amount == Rs 10 // Same As Order amount
          currency: "INR",
        },
      },
     async function (err, response, body) {
       if (err) {
         console.error(err);
        return res.status(500).json({
           message: "Something Went Wrong",
         }); 
       }
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
        return res.status(200).json(body);
      });
    } catch (err) {
      console.error("cauf=ght",err);
      return res.status(500).json({
        message: "Something Went Wrong",
     });
    }
  });


app.listen(PORTVAL,()=>{console.log(`Listening from the ${PORTVAL}`)});