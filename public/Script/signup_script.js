async function add_data() {
  let name = document.getElementById("inpN").value;
  let email = document.getElementById("email").value;
  let age = document.getElementById("age").value;

  let height = document.getElementById("height").value;
  let weight = document.getElementById("weight").value;

  let TW = document.getElementById("TW").value;
  let NOD = document.getElementById("NOD").value;

  let password = document.getElementById("pass").value;
  let Cpassword = document.getElementById("Cpass").value;

  if (
    name == "" ||
    email == "" ||
    age == "" ||
    height == "" ||
    weight == "" ||
    TW == "" ||
    NOD == "" ||
    password == "" ||
    Cpassword == ""
  ) {
    alert("Fill all the values in the form!");
  } else {
    let gender;
    let male = document.getElementById("male");
    let female = document.getElementById("female");
    if (male.checked == true) {
      gender = "Male";
    } else if (female.checked == true) {
      gender = "Female";
    }

    let goal;
    let lw = document.getElementById("loosefat");
    let gw = document.getElementById("gainweight");
    if (lw.checked == true) {
      goal = 1;
    } else if (gw.checked == true) {
      goal = 2;
    }

    let occupation = document.getElementById("occupation").value;
    let bio = document.getElementById("bio").value;
    let isAdmin = false;
    let h_in_m = height / 100;
    let BMI = weight / Math.pow(h_in_m, 2);
    BMI = Math.trunc(BMI);

    let BMR;

    if (gender == "Male") {
      BMR = 88.372 + 13.397 * weight + 4.799 * height - 5.677 * age;
      BMR = Math.trunc(BMR);
    } else if (gender == "Female") {
      BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
      BMR = Math.trunc(BMR);
    }
    let CTB = ((weight - TW) * 7700) / NOD;
    CTB = Math.trunc(CTB);
    CTB = Math.abs(CTB);
    let CTE;
    if (goal == 1) {
      CTE = BMR;
    } else if (goal == 2) {
      CTE = BMR + CTB;
    }

    if (password === Cpassword) {
      const res_obj = await fetch("/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age: Number(age),
          gender,
          occupation,
          bio,
          height: Number(height),
          weight: Number(weight),
          goal,
          TW: Number(TW),
          NOD: Number(NOD),
          password,
          BMI: Number(BMI),
          BMR: Number(BMR),
          CTB: Number(CTB),
          CTE: Number(CTE),
          isAdmin,
        }),
      });
      console.log(res_obj);

      const resposne = await res_obj.json();
      console.log(resposne);
      if (res_obj.status == 401) {
        alert("User already exist!");
      } else if (res_obj.status == 200) {
        window.location = "../user_page.html";
        alert("SignUp was Successful!");
      }
    } else {
      alert("password and confirm password not matching!");
    }
  }
}
