import "./navbarActive.js";
const productSection = document.querySelector(".product-item");
const cat = document.querySelector(".select-category");
const viewItem = document.querySelector(".view-product");
const toatalProducts = document.querySelector(".total-products");
let products = JSON.parse(localStorage.getItem("products"));
let category = JSON.parse(localStorage.getItem("categories"));
let currentViewId;
let deleteProductId;
category.forEach((item) => {
  cat.innerHTML += `
    <option value='${item.catId}'>${item.category}
    `;
});

cat.addEventListener("change", (e) => {
  if (e.target.value === "") {
    renderProducts(products);
    return;
  }
  let filteredProduct = products.filter((item) => {
    if (parseInt(item.category) === parseInt(e.target.value)) {
      return item;
    }
    return false;
  });
  renderProducts(filteredProduct);
});

if (products.length === 0) {
  viewItem.innerHTML = `<h1>No product available</h1>`;
}

function renderProducts(products) {
  if (parseInt(deleteProductId) === parseInt(currentViewId)) {
    viewItem.innerHTML = "";
  }
  productSection.innerHTML = "";
  products.forEach((item) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2>${item.name}</h2> 
      <div class='card-btn' id=${item.id}>    
      <button class='view'>view</button>
      <button class='edit'>edit</button>
      <button class='delete'>delete</button>
      </div>
      `;
    productSection.appendChild(card);
    toatalProducts.innerHTML = `Total Products (${products.length})`;
  });
}
renderProducts(products);

productSection.addEventListener("click", function (e) {
  console.log(e.target.parentNode.id);
  if (e.target.className === "delete") {
    let id = e.target.parentNode.id;
    deleteProduct(id);
  }

  if (e.target.className === "edit") {
    let id = e.target.parentNode.id;
    editProduct(id);
  }

  if (e.target.className === "view") {
    let id = e.target.parentNode.id;
    viewProduct(id);
  }
});

function deleteProduct(id) {
  deleteProductId = id;
  products = products.filter((item) => {
    if (parseInt(item.id, 10) === parseInt(id, 10)) {
      return false;
    }
    return true;
  });
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts(products);
}

function viewProduct(id) {
  currentViewId = id;
  let foundProduct = products.find(
    (item) => parseInt(item.id, 10) === parseInt(id, 10)
  );
  console.log(foundProduct.file);
  let foundCat = category.find(
    (item) => parseInt(foundProduct.category, 10) === parseInt(item.catId, 10)
  );

  viewItem.innerHTML = "";
  viewItem.innerHTML += `
  <div class="add-product-heading">
              <h1>View Product</h1>
            </div>
  <div class="add-product">
  
  <form class="add-product-form">
            

            <div class="form-text">
              <input
                type="text"
                name="name"
                value="${foundProduct.name}"
                placeholder="Product Name"
                disabled
              />
              <select id="select-category" name="category" disabled >
                <option value="">Select category</option>
              </select>
            </div>

            <div class="form-number">
              <input
                type="number"
                name="quantity"
                value="${foundProduct.quantity}"
                placeholder="Enter Quantity available"
                disabled
              />
              <input
                type="number"
                name="price"
                value="${foundProduct.price}"
                placeholder="Enter the product price"
                disabled
              />
            </div>

            <div class="form-textarea">
              <textarea
                name="description"
                rows="6"
                cols="50"
                placeholder="Enter the description about the product"
                disabled
              >${foundProduct.description}</textarea>
            </div>
          </form>
 
</div>`;
  getOptions(foundCat);
}

function editProduct(id) {
  let foundProduct = products.find(
    (item) => parseInt(item.id, 10) === parseInt(id, 10)
  );

  let foundCat = category.find(
    (item) => parseInt(foundProduct.category, 10) === parseInt(item.catId, 10)
  );
  viewItem.innerHTML = "";
  viewItem.innerHTML += `
  <div class="add-product-heading">
              <h1>Edit Product</h1>
            </div>
  <div class="add-product edit-single-product">
  
  <form class="add-product-form">
            

            <div class="form-text">
              <input
                type="text"
                name="name"
                value="${foundProduct.name}"
                placeholder="Product Name"
                required
              />
              <select id="select-category" name="category" required>
                <option value="">Select category</option>
              </select>
            </div>

            <div class="form-number">
              <input
                type="number"
                name="quantity"
                value="${foundProduct.quantity}"
                placeholder="Enter Quantity available"
                required
              />
              <input
                type="number"
                name="price"
                value="${foundProduct.price}"
                placeholder="Enter the product price"
                required
              />
            </div>

            <div class="form-textarea">
              <textarea
                name="description"
                rows="6"
                cols="50"
                placeholder="Enter the description about the product"
                required
              >${foundProduct.description}</textarea>
            </div>
            <div class="success">
              <p>Product Successfully Added</p>
            </div>
            <div class="btn">
              <button type="submit" class="submit">Edit product</button>
            </div>
          </form>
 
</div>`;

  getOptions(foundCat);
  updateProduct(foundProduct);
}

function getOptions(foundCat) {
  const select = document.querySelector("#select-category");
  category.forEach((item) => {
    select.innerHTML += `
    <option value='${item.catId}' ${
      parseInt(foundCat.catId) === parseInt(item.catId) ? "selected" : ""
    }>${item.category}</option>
    `;
  });
}

function updateProduct(foundProduct) {
  const productForm = document.querySelector(".add-product-form");
  const success = document.querySelector(".success");

  let productObject = {};
  let url;
  productForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(productForm);
    let data = [...formData];
    data.forEach((element) => {
      if (element[0] == "file") {
        if (element[1].name === "") {
          url = foundProduct.file;
        } else {
          url = URL.createObjectURL(element[1]);
        }
        productObject[element[0]] = url;
      } else {
        productObject[element[0]] = element[1];
      }
    });
    productObject["id"] = foundProduct.id;
    products = products.map((item) => {
      if (parseInt(item.id, 10) === parseInt(foundProduct.id, 10)) {
        return productObject;
      }
      return item;
    });

    localStorage.setItem("products", JSON.stringify(products));
    success.classList.add("active");
  });
}
