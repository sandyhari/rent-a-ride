const bcrypt = require("bcrypt");
const saltRounds = 10;

const generateHash = (text) => {
  console.log("came here ",text);
    return new Promise((resolve, reject) => {
      bcrypt.hash(text, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          console.log(hash);
          resolve(hash);
        }
      });
    });
  };

  //generateHash("password");

  const compareHash = (text, passwordHash) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(text, passwordHash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  exports.generateHash = generateHash;
  exports.compareHash = compareHash;