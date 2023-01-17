const jwt = require("jsonwebtoken");
const { secret_key } = require("../controllers/user_controller");

const verify_token = (req, res, next) => {
  //get token from cookie
  const token = req.cookies.jwt;

  if (token) {
    try {
      const user_payload = jwt.verify(token, secret_key);
      req.user_payload = user_payload;
      // console.log("payload during authentication:", user_payload);
      next();
    } catch (error) {
      res.status(400).send({ status: "Error", msg: "Invalid token" });
    }
  } else {
    res.status(404).send({ status: " Error ", msg: "Token not found" });
  }
};

const isAdmin = (req, res, next) => {
  const user_payload = req.user_payload;
  try {
    if (user_payload.isAdmin == true) {
      console.log("isAdmin:", user_payload.isAdmin);
      next();
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "failure", msg: "error in admin auth" });
  }
};
module.exports = { verify_token, isAdmin };
