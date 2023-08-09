const path = window.location;
const li = document.getElementsByClassName("list-item");
let aLocation = document.querySelectorAll(".list-item > a");
let show = document.querySelector(".dashboard-container");
const logo = document.getElementsByClassName("logo");
const logout = document.querySelector(".logout");

for (let i = 0; i < aLocation.length; i++) {
  let currentPath = new URL(aLocation[i].href);
  if (currentPath.pathname === path.pathname) {
    li[i].classList.add("active");
  }
}

if (localStorage.getItem("login") === null) {
  window.location.href = "/index.html";
} else {
  show.classList.remove("hide");
}

logo[0].innerHTML = `<i class="fa-solid fa-code"></i>`;

logout.addEventListener("click", function () {
  localStorage.removeItem("login");
  window.location.href = "/index.html";
});
export { path };
