const form = document.querySelector("form");
let users = JSON.parse(localStorage.getItem("users"));
const error = document.querySelector(".error");
form.method = "post";
let found = [];
let user = {};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(form);
  let loginData = [...data.entries()];
  loginData.forEach((element) => {
    user[element[0]] = element[1];
  });

  if (users.length === 0) {
    users.push(user);
  } else {
    found = users.filter((element) => {
      if (element["email"] == user["email"]) {
        return true;
      }
      return false;
    });
  }
  if (found.length > 0) {
    error.classList.add("active");
  } else {
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/";
  }
});
