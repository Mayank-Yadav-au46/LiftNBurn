const userModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user_model = require("../models/user_model");

const secret_key = process.env.secret_key;
// const secret_key = "123@321";

//-----------------------------signup function--------------------------------------

const SignUp = async (req, res) => {
  const user_data = req.body;
  const email = user_data.email;
  const payload = { email: user_data.email, isAdmin: user_data.isAdmin };
  console.log(email);

  const signup_user = await user_model.findOne({ email });

  if (signup_user) {
    res.status(401).send({
      status: "Failure",
      msg: "User already exist!",
    });
  } else {
    console.log("payload before signup: ", payload);
    // console.log("secret key from env:", process.env.secret_key);
    const token = jwt.sign(payload, process.env.secret_key, {
      algorithm: "HS384",
      expiresIn: "1d",
    });
    console.log("token after signup: ", token);
    res.cookie("jwt", token);

    user_data.password = await bcrypt.hash(user_data.password, 5);
    try {
      const new_user = await userModel.create(user_data);
      res.status(200).send({
        status: "success",
        user: new_user,
      });
      console.log(new_user);
    } catch (error) {
      res.send("Error creating user");
    }
  }
};

//------------------------------------login function ----------------------------------------

const login = async (req, res) => {
  console.log(process.env.secret_key);
  const obj = req.body;
  const { email, password } = req.body;
  // console.log("obj from login request:", obj);
  try {
    const login_user = await userModel.findOne({ email });
    if (!login_user) {
      res.status(404).send({ status: "error", msg: "Didn't find the user" });
    }

    const pass_match = await bcrypt.compare(password, login_user.password);
    if (!pass_match) {
      res.status(400).send({ status: "Error", msg: "Password incorrect" });
    }
    if (pass_match) {
      //Generating token

      const payload = { email, isAdmin: login_user.isAdmin };
      const token = jwt.sign(payload, secret_key, {
        algorithm: "HS384",
        expiresIn: "1d",
      });
      // console.log("token after sign in: ", token);
      res.cookie("jwt", token);
      res.status(200).send({
        status: "success",
        msg: "user found",
        isAdmin: login_user.isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//------------------log out function -----------------------------

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.send({ status: "success", msg: "Successfully logged out!" });
};

//----------------------user function----------------------------

const object = async (req, res) => {
  try {
    // console.log("After login", req.user_payload);
    let { email } = req.user_payload;
    console.log(email);
    const user = await userModel.findOne({ email });

    res.send(user);
  } catch (error) {}
};

// ------------------------------------rate function----------------
const rate = async (req, res) => {
  try {
    const { calorie } = req.body;
    const { email } = req.user_payload;
    const user = await userModel.findOne({ email });
    const { _id } = user;
    console.log(_id);
    await userModel.findByIdAndUpdate(_id, {
      $push: {
        CI: calorie,
      },
    });
    // console.log(updated_data);
    // console.log("after pushing", user.CI, user);
    const updated_user = await userModel.findOne({ email });
    const inp_arr = updated_user.CI;
    const cal_to_burn = updated_user.CTB;
    console.log(inp_arr, cal_to_burn);
    // let sum;
    // for (let i = 0; i < inp_arr; i++) {
    //   console.log(sum, inp_arr);
    //   sum = sum + inp_arr[i];
    //   console.log(sum);
    // }
    // console.log("sum is :", sum);
    // console.log(inp_arr.length);
    // let rate = (sum / (inp_arr.length * cal_to_burn)) * 100;
    // console.log("rate is:", rate);

    res.send({ inp_arr, cal_to_burn, msg: "rate data sent successfully!" });
  } catch (error) {
    res.send(error);
  }
};

// -------------------------------admin function---------------
const userdata = async (req, res) => {
  try {
    const users = await userModel.find();
    res.send({ status: "success", users });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  SignUp,
  rate,
  login,
  secret_key,
  userdata,
  logout,
  object,
};
