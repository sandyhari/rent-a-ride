require("../config/dbConfig");

const Product = require("../models/userModel");

const procuseeeder = () => {
  const item = new Product({
    username: "testUser",
    email: "test@gmail.com",
    passwordHash : "testpwd" 
  });

  item.save((err, result) => {
    if (err) {
      console.error();
    } else {
      console.log(result);
    }
  });
};

procuseeeder();
