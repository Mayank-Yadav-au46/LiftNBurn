async function getusers() {
  const userlist = document.getElementById("user_list");
  const getuser = await fetch("/user/admin/getusers");
  const response = await getuser.json();

  const { users } = response;
  console.log(users);
  console.log(users);
  if (users.length == 0) {
    userlist.append("No users found");
  } else {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const liuser = document.createElement("li");
      liuser.innerText = `name: ${user.name}  email: ${user.email}`;
      userlist.append(liuser);
    }
  }
}

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
