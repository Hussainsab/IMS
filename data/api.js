const BASE_URL = "https://fakestoreapi.com";

const getProducts = async () => {
  try {
    let response = await fetch(`${BASE_URL}/products`);
    let produtsData = await response.json();
    console.log(produtsData);
    return produtsData;
  } catch {
    alert("failed to fetch the products");
  }
};

export { getProducts };
