const mongoose = require("mongoose");

async function db_connect() {
  console.log("runing db_connect");

  // console.log(process.env);
  try {
    await mongoose.connect(process.env.Mongo_url, { dbName: "Lift_and_burn" });
    console.log("Connection Successfull");
  } catch (error) {
    console.log("Error connecting database");
    console.log(error);
    process.exit();
  }
}

module.exports = db_connect;
