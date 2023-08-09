import "./navbarActive.js";
const productForm = document.querySelector(".add-product-form");
let products = JSON.parse(localStorage.getItem("products"));
const cat = document.querySelector(".select-category");
let categoriesList = JSON.parse(localStorage.getItem("categories"));
let success = document.querySelector(".success");
let productObject = {};

productForm.addEventListener("submit", function (e) {
  e.preventDefault();
  products = JSON.parse(localStorage.getItem("products"));
  let formData = new FormData(productForm);
  let data = [...formData];
  data.forEach((element) => {
    productObject[element[0]] = element[1];
  });
  addProduct(productObject);
});

// =============== generating new ID and pushing to localStorage =========================
function addProduct(prod) {
  prod["id"] = products.length;
  products.push(prod);
  localStorage.setItem("products", JSON.stringify(products));
  success.classList.add("active");
  productForm.reset();
}

//=============== show available category in add product page================

categoriesList.forEach((item) => {
  cat.innerHTML += `
  <option value='${item.catId}'>${item.category}
  `;
});
