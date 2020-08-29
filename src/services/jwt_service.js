const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY || "randomString";

const userTokenGenerator = (email) => {
    const token = jwt.sign(
      {
        sub: "userEmail",
        email
      },
      jwtKey,
      {
        expiresIn: "1 hour"
      }
    );
    return token;
  };

exports.userTokenGenerator = userTokenGenerator;