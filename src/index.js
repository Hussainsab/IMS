const form = document.querySelector("form");
const error = document.querySelector(".error");
form.method = "post";
let login = null;
let user = {};
let index = -1;
let products = [];
let users = [];
let categories = [];

if (localStorage.getItem("products") === null) {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("categories", JSON.stringify(categories));
} else {
  products = JSON.parse(localStorage.getItem("products"));
  console.log(Array.isArray(products));
}
login = JSON.parse(localStorage.getItem("users"));

//============ event listner for login ========================
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = new FormData(form);
  let loginData = [...data.entries()];
  loginData.forEach((item) => {
    user[item[0]] = item[1];
  });
  login.forEach((element) => {
    if (element.email === user.email && element.password === user.password) {
      index = 1;
    }
  });
  if (index === -1) {
    error.classList.add("active");
  } else {
    localStorage.setItem("login", JSON.stringify(user));
    window.location.href = "/pages/allProducts.html";
  }
});
