const logout = async () => {
  try {
    const obj = fetch("user/userpage/logout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const response = (await obj).json;
    console.log(response);
    window.location = "../index.html";
    alert("Logged Out Successfully! Welcome to the home page");
  } catch (error) {
    console.log(error);
  }
};

// ---------------main function--------------
async function user() {
  const res_obj = await fetch("user/userpage/object", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const response = await res_obj.json();

  document.getElementById("username").innerText = response.name;
  document.getElementById("welcomeusername").innerText = response.name;
  document.getElementById("dispbmi").innerText = response.BMI;
  // document.getElementById("dispbmr").innerText = response.BMR;
  document.getElementById("ctb").innerText = response.CTB;

  let warmup_cal = response.CTB * (20 / 100);
  warmup_cal = Math.trunc(warmup_cal);
  document.getElementById("ctb-warmup").innerText = warmup_cal;
  let workout_cal = response.CTB * (80 / 100);
  workout_cal = Math.trunc(workout_cal);
  document.getElementById("ctb-workout").innerText = workout_cal;

  document.getElementById("cte").innerText = response.CTE;

  if (response.BMI < 18.5) {
    document.getElementById("bmistatus").innerText = "Underweight.";
  } else if (response.BMI > 18.5 && response.BMI < 24.9) {
    document.getElementById("bmistatus").innerText = "Healthy.";
  } else if (response.BMI > 25 && response.BMI < 30) {
    document.getElementById("bmistatus").innerText = "Overweight.";
  }
}

user();

async function rate_cal() {
  let calorie = document.getElementById("cal_input").value;
  console.log(calorie);

  try {
    const res_obj = await fetch("/user/userpage/rate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        calorie,
      }),
    });
    console.log("rate is running");
    const response = await res_obj.json();
    const { inp_arr, cal_to_burn } = response;
    console.log(inp_arr, cal_to_burn);
    let sum = 0;
    for (let i = 0; i < inp_arr.length; i++) {
      sum = sum + inp_arr[i];
    }

    let rate = (sum / (inp_arr.length * cal_to_burn)) * 100;
    console.log(rate);
    rate = Math.trunc(rate);
    document.getElementById("rate").innerText = rate;
  } catch (error) {
    console.log(error);
  }
}
