import "./navbarActive.js";
const categoriesList = document.querySelector(".list-cat");
const categoryContainer = document.querySelector(".add-product");
let categoryObject = {};
let categories = JSON.parse(localStorage.getItem("categories"));
let products = JSON.parse(localStorage.getItem("products"));

function addCatFormToDom(type) {
  categoryContainer.innerHTML = "";
  categoryContainer.innerHTML = `
  <form class="add-category-form">
            <h1>${type}</h1>
            <input
              type="text"
              name="category"
              placeholder="category Name"
              required
            />

            <textarea
              name="description"
              rows="6"
              cols="50"
              placeholder="Enter the description about Category"
              required
            ></textarea>
            <p class="info"></p>
            <div class="btn">
              <button type="submit" class="submit">${type}</button>
              <button type="reset" class="reset">Reset</button>
            </div>
          </form>`;
  const categoryForm = document.querySelector(".add-category-form");
  const pElement = document.querySelector(".info");
  categoryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(categoryForm);
    let data = [...formData];
    data.forEach((element) => {
      categoryObject[element[0]] = element[1];
    });
    addCategory(categoryObject, pElement);
    categoryForm.reset();
  });
}

addCatFormToDom("Add Category");

function addCategory(cat, pElement) {
  cat["catId"] = categories.length;
  let categoryName = cat.category.toLowerCase();
  let found = categories.find(
    (item) => item.category.toLowerCase() === categoryName
  );
  if (found === undefined) {
    categories.push(cat);
    localStorage.setItem("categories", JSON.stringify(categories));
    pElement.innerHTML = "category added successfull";
    pElement.classList.add("success");
    categories = JSON.parse(localStorage.getItem("categories"));
    addCatListToDom(categories);
    return;
  } else {
    pElement.innerHTML = "category already exist";
    pElement.classList.add("error");
  }
}

function addCatListToDom(categories) {
  // let categories = JSON.parse(localStorage.getItem("categories"));
  console.log("i got executed", categories);

  categoriesList.innerHTML = "";
  categoriesList.innerHTML = "<h1>Category List</h1>";
  categories.forEach((cat, index) => {
    let card = document.createElement("div");
    card.classList.add("single-cat");
    card.innerHTML = `
      <h2>${index + 1}</h2>
      <h2>${cat.category}</h2> 
      <div class='cat-btn' id=${cat.catId}>
      <i id='view' class="fa-solid fa-eye view-cat"></i>
      <i id='edit' class="fa-solid fa-pen-to-square edit-cat"></i> 
      <i id='delete' class="fa-solid fa-trash delete-cat"></i>   
      </div>
      `;
    categoriesList.appendChild(card);
  });
}
addCatListToDom(categories);

categoriesList.addEventListener("click", (e) => {
  console.log(e.target.parentNode.id);
  let id = e.target.parentNode.id;
  categories = JSON.parse(localStorage.getItem("categories"));
  console.log(e.target.id);
  if (e.target.id === "view") {
    let foundCat = categories.find(
      (item) => parseInt(item.catId) === parseInt(id)
    );
    console.log(foundCat.category, foundCat.description);

    viewCategory(foundCat);
  }
  if (e.target.id === "edit") {
    let foundCat = categories.find(
      (item) => parseInt(item.catId) === parseInt(id)
    );
    console.log(foundCat.category, foundCat.description);

    editCategory(id, foundCat);
  }
  if (e.target.id === "delete") {
    deleteCategory(id, categories);
  }
});

function deleteCategory(id, categories) {
  console.log(id);
  let foundProduct = products.find(
    (item) => parseInt(item.category, 10) === parseInt(id, 10)
  );
  console.log(foundProduct);

  if (foundProduct === undefined) {
    categories = categories.filter(
      (cat) => parseInt(cat.catId, 10) !== parseInt(id, 10)
    );
    localStorage.setItem("categories", JSON.stringify(categories));
  } else {
    alert(
      "cant delete the category it is added to some products, delete the product and then delete"
    );
  }
  addCatListToDom(categories);
}

function viewCategory(foundCat) {
  categoryContainer.innerHTML = "";
  categoryContainer.innerHTML = `
          <form class="add-category-form">
            <h1>View Category</h1>
            <input
              type="text"
              name="category"
              value =${foundCat.category}
              placeholder="category Name"
              disabled
            />

            <textarea
              name="description"
              rows="6"
              cols="50"
              placeholder="Enter the description about Category"
              disabled
            >${foundCat.description}</textarea>
          </form>`;
}

function editCategory(id, foundCat) {
  categoryContainer.innerHTML = "";
  categoryContainer.innerHTML = `
          <form class="add-category-form">
            <h1>View Category</h1>
            <input
              type="text"
              name="category"
              value =${foundCat.category}
              placeholder="category Name"

            />

            <textarea
              name="description"
              rows="6"
              cols="50"
              placeholder="Enter the description about Category"

            >${foundCat.description}</textarea>
            <div class="btn">
              <button type="submit" class="submit">save</button>
            </div>
          </form>`;
  const categoryForm = document.querySelector(".add-category-form");
  categoryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(categoryForm);
    let data = [...formData];
    data.forEach((element) => {
      categoryObject[element[0]] = element[1];
    });
    updateCategory(id, categoryObject);
    categoryForm.reset();
  });
}

function updateCategory(id, categoryObject) {
  categoryObject["catId"] = id;
  categories = categories.map((item) => {
    if (parseInt(item.catId) === parseInt(id)) {
      return categoryObject;
    }
    return item;
  });
  localStorage.setItem("categories", JSON.stringify(categories));
  addCatListToDom(categories);
}
