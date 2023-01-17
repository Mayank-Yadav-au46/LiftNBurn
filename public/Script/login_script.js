async function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  try {
    const res_obj = await fetch("/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res_obj.status);
    const resposne = await res_obj.json();
    console.log(resposne);
    if (resposne.isAdmin == true) {
      alert("Welcome Admin");
      window.location = "../admin.html";
    } else {
      if (res_obj.status == 404) {
        alert("User not found");
      } else if (res_obj.status == 400) {
        alert("Incorrect password");
      } else if (resposne.status == "success") {
        alert("You have successfully logged in.");
        window.location = "../user_page.html";
      }
    }
  } catch (error) {
    console.log(error);
  }
}
