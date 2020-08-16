const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY || "randomString";

const userTokenGenerator = (email) => {
    const token = jwt.sign(
      {
        sub: "admin",
        email
      },
      jwtKey,
      {
        expiresIn: "1 hours"
      }
    );
    return token;
  };

exports.userTokenGenerator = userTokenGenerator;