// Constants
const apiEndpoint = "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093";
const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const gridViewButton = document.getElementById("grid-view");
const listViewButton = document.getElementById("list-view");

let products = []; // Store the fetched products

// Function to fetch product data from the API
async function fetchProducts() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    products = data.data;
    console.log(products);
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Function to render product cards
function renderProducts(products, searchKeyword) {
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    const variantStrings = product.product_variants.map((variant) => {
      const key = Object.keys(variant)[0];
      return `${variant[key]}`;
    });
    productCard.innerHTML = `
        <img src= "${product.product_image}" alt="${product.product_title}">
        <h2>${highlightMatches(product.product_title,searchKeyword)}</h2>
        <p>${highlightMatches(variantStrings.join(", "),searchKeyword)}</p>
        <span class="badge">${product.product_badge}</span>
    `;
    // Append other elements to the product card

    productContainer.appendChild(productCard);
  });
}
function highlightMatches(text, searchKeyword) {
  if (!searchKeyword) {
      return text; // No search keyword provided, return the original text
  }

  // Use a regular expression to find and replace matches with a <span> element
  const regex = new RegExp(searchKeyword, "gi"); 
  return text.replace(regex, (match) => `<span class="highlight-green">${match}</span>`);
}

// Function to handle search input
searchInput.addEventListener("input", () => {
  const searchKeyword = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.product_title.toLowerCase().includes(searchKeyword)
  );
  // Pass the searchKeyword to the renderProducts function
  renderProducts(filteredProducts, searchKeyword); 
});

// Function to switch between grid and list view
gridViewButton.addEventListener("click", () => {
  productContainer.classList.remove("active");
});


listViewButton.addEventListener("click", () => {
  productContainer.classList.add("active");
});

// Initial fetch of products
fetchProducts();

