const { Router } = require("express");

const sample_router = new Router();
const {
  login,
  SignUp,
  rate,
  userdata,
  logout,
  object,
} = require("../controllers/user_controller");
const { verify_token, isAdmin } = require("../middleware/auth_middleware");

sample_router.post("/login", login);
sample_router.post("/signup", SignUp);
sample_router.use(verify_token);

sample_router.get("/userpage/object", object);
sample_router.post("/userpage/logout", logout);
sample_router.post("/userpage/rate", rate);
sample_router.use(isAdmin);
sample_router.get("/admin/getusers", userdata);

module.exports = sample_router;
