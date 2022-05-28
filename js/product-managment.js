//#region Declaration
let products = [];
let productId;
// Product class
class Product {
    id;
    title;
    price;
    taxes;
    ads;
    discount;
    total;
    count;
    category;
    constructor(title, price, taxes, ads, discount, total, count, category) {
        this.id = Math.random();
        this.title = title || "unknown";
        this.price = price || 0;
        this.taxes = taxes || 0;
        this.ads = ads || 0;
        this.discount = discount || 0;
        this.total = total;
        this.count = count || 1;
        this.category = category || "unknown";
    }
}
//#endregion Declaration

//#region  get page controls
let body = document.body;
let title = document.querySelector("[name='title']");
let price = document.querySelector("[name='price']");
let taxes = document.querySelector("[name='taxes']");
let ads = document.querySelector("[name='ads']");
let discount = document.querySelector("[name='discount']");
let total = document.querySelector("[name='total']");
let count = document.querySelector("[name='count']");
let category = document.querySelector("[name='category']");
let search = document.querySelector("[name='search']");
let btnCreate = document.querySelector("#btnCreate");
let btnSearchByTitle = document.querySelector("#btn-search-title");
let btnSearchByCat = document.querySelector("#btn-search-cat");
let btnDeleteAll = document.querySelector("#btn-delete-all");
let btnCancel = document.querySelector("#btnCancel");
let contentTable = document.querySelector(".data-table>tbody:last-child");
let divAddButtons = document.querySelector("#add-buttons");
let divContainer = document.querySelector(".container");
let productsNumber = document.querySelector("#products-no");
let colorIndicator = document.querySelector("#color-indicator");
let colorButton = document.querySelector(".color-mode");
let inputs = Array.from(document.querySelectorAll("input"));
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let tableData = document.querySelector(".data");
let tableheadrs = Array.from(document.querySelectorAll(".data-table td"));
let divTableHeader = document.querySelector(".table-header");
let divDataTable = document.querySelector(".data-table");
let tableTitles = document.querySelector(".data-table>tbody>tr");
let buttons = document.querySelectorAll("button");
let bullet = document.querySelector(".bullet");
//#endregion

//#region  Methods
//load all products 
function loadProducts() {
    //check there r saved products
    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"));
        createProductsTable(products);
    }
    else {
        btnDeleteAll.style.display = "none";
        productsNumber.innerHTML = `(0) Products`;
    }
}
//add new  product(s)
function addProducts(count) {
    for (let i = 0; i < count; i++) {
        let product = new Product(title.value,
            parseInt(price.value),
            parseInt(taxes.value),
            parseInt(ads.value),
            parseInt(discount.value),
            parseInt(total.innerHTML),
            parseInt(count.value),
            category.value);
        products.push(product);
    }
    window.scrollTo(0, tableData.offsetTop);
    addToLocalStorage(products);
    createProductsTable(products);
    clearData();
}
//add products to local storage
function addToLocalStorage(products) {
    localStorage.setItem("products", JSON.stringify(products.reverse()));
}
function createProductsTable(products) {
    contentTable.innerHTML = "";
    productsNumber.innerHTML = `(${products.length}) Products`;
    btnDeleteAll.style.display = "block";
    products.forEach((product) => {
        let tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.setAttribute("data-index", product.id);
        let tdId = document.createElement("td");
        tdId.innerHTML = product.id;
        let tdTitle = document.createElement("td");
        tdTitle.innerHTML = product.title;
        let tdPrice = document.createElement("td");
        tdPrice.innerHTML = product.price;
        let tdTaxes = document.createElement("td");
        tdTaxes.innerHTML = product.taxes;
        let tdAds = document.createElement("td");
        tdAds.innerHTML = product.ads;
        let tdDiscount = document.createElement("td");
        tdDiscount.innerHTML = product.discount;
        let tdTotal = document.createElement("td");
        tdTotal.innerHTML = product.total;
        let tdCategory = document.createElement("td");
        tdCategory.innerHTML = product.category;
        let tdUpdate = document.createElement("td");
        let tdDelete = document.createElement("td");
        let btnUpdate = document.createElement("button");
        btnUpdate.innerHTML = "Update";
        btnUpdate.classList.add("actions-buttons");
        tdUpdate.appendChild(btnUpdate);
        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Delete";
        btnUpdate.style.cursor = "pointer";
        btnDelete.classList.add("actions-buttons");
        btnDelete.style.cursor = "pointer";
        tdDelete.appendChild(btnDelete);
        tr.append(tdId, tdTitle, tdPrice, tdTaxes, tdAds, tdDiscount, tdTotal, tdCategory, tdUpdate, tdDelete);
        contentTable.appendChild(tr);
    });
    buttons = Array.from(document.querySelectorAll("button"));
}
function getSelectedProduct(e) {
    if (e.target.parentElement.parentElement.hasAttribute("data-index")) {
        productId = e.target.parentElement.parentElement.getAttribute("data-index");
    }
}
function editProduct() {
    products.forEach((p) => {
        if (p.id == productId) {
            title.value = p.title;
            price.value = p.price;
            taxes.value = p.taxes;
            ads.value = p.ads;
            discount.value = p.discount;
            total.innerHTML = p.total;
            count.style.display = "none";
            category.value = p.category;
            btnCreate.innerHTML = "Update";
            btnCancel.style.display = "inline-block";
            btnCreate.classList.remove("btn-big");
            btnCreate.classList.add("btn-small");
            btnCancel.classList.add("btn-small");
            divAddButtons.className = "search-buttons";
        }
    });
    window.scrollTo(0, 0);
}
function updateProduct() {
    products.forEach((p) => {
        if (p.id == productId) {
            p.title = title.value;
            p.price = price.value;
            p.taxes = taxes.value;
            p.ads = ads.value;
            p.discount = discount.value;
            p.total = total.innerHTML;
            p.category = category.value;
        }
    });
    window.scrollTo(0, tableData.offsetTop);
    addToLocalStorage(products);
    loadProducts();
    clearData(true);
}
function deleteProduct() {
    products = products.filter(p => p.id != productId);
    addToLocalStorage(products);
    loadProducts();
}
function deleteAllProducts() {
    products = [];
    localStorage.removeItem("products");
    contentTable.innerHTML = "";
}
// search by title
function searchByTitle(title) {
    let productsByTitle = products.filter(p => p.title.toLowerCase().includes(title.toLowerCase()));
    createProductsTable(productsByTitle);
}
// search by category
function searchByCategory(category) {
    let productsByCategory = products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    createProductsTable(productsByCategory);
}
//clear product data
function clearData(cancelUpdate = false) {
    title.value = "";
    price.value = "0";
    taxes.value = "0";
    ads.value = "0";
    discount.value = "0";
    category.value = "";
    total.innerHTML = "";
    search.value = "";
    count.value = "1";
    if (cancelUpdate) {
        btnCreate.innerHTML = "Create";
        btnCreate.classList.remove("btn-small");
        btnCreate.classList.add("btn-big");
        btnCancel.style.display = "none";
        count.style.display = "block";
        divAddButtons.classList.remove("search-buttons");
    }
}
// validate fields
function validate() {
    if (title.value == "" || category.value == "" || price.value == 0 || taxes.value == 0 || ads.value == 0) {
        return false;
    }
    return true;
}
//#region page theme methods
// save theme to local storage
function addColorModeToLocalStorage(currentMode) {
    localStorage.setItem("data-color", currentMode);
}
// load page theme
function loadPageTheme() {
    if (localStorage.getItem("data-color")) {
        setPageTheme(localStorage.getItem("data-color"));
    }
    else {
        colorIndicator.setAttribute("data-color", "dark");
        setPageTheme("dark");
    }
}
// reset page theme
function resetPageThemes() {
    colorIndicator.classList.remove("light", "dark")
    body.classList.remove("light", "dark");
    h1.classList.remove("light", "dark");
    h3.classList.remove("light", "dark");
    total.classList.remove("light", "dark");
    divTableHeader.classList.remove("light", "dark");
    divTableHeader.classList.remove("light", "dark");
    divDataTable.classList.remove("light", "dark");
    tableTitles.classList.remove("light", "dark");
    bullet.classList.remove("light");
    inputs.forEach(input => input.classList.remove("light", "dark"));
    if (buttons) {
        buttons.forEach(button => button.classList.remove("light", "dark"));
    }
    tableheadrs.forEach(header => header.classList.remove("light", "dark"));
}
// set page themes
function setPageTheme(dataColor) {
    resetPageThemes();
    colorButton.title = dataColor == "dark" ? 'Light mode' : 'Dark mode';
    colorIndicator.classList.add(dataColor);
    bullet.classList.add(dataColor);
    colorIndicator.setAttribute("data-color", dataColor);
    body.classList.add(dataColor);
    h1.classList.add(dataColor);
    h3.classList.add(dataColor);
    total.classList.add(dataColor);
    divTableHeader.classList.add(dataColor);
    divDataTable.classList.add(dataColor);
    tableTitles.classList.add(dataColor);
    inputs.forEach(input => input.classList.add(dataColor));
    if (buttons) {
        buttons.forEach(button => button.classList.add(dataColor));
    }
    tableheadrs.forEach(header => header.classList.add(dataColor));
}
// toggle page theme
function togglePageTheme() {
    let color = colorIndicator.getAttribute("data-color") == 'dark' ? 'light' : 'dark';
    colorIndicator.setAttribute("data-color", color);
    setPageTheme(color);
    addColorModeToLocalStorage(color);
}
//#endregion
//#endregion

export {
    Product, productId, products, title, price, taxes, ads, body,
    discount, total, count, category, search, btnCreate, btnSearchByTitle, colorIndicator,
    btnSearchByCat, btnDeleteAll, btnCancel, contentTable, divAddButtons, divContainer, productsNumber,
    loadProducts, addProducts, editProduct, updateProduct, searchByTitle, searchByCategory, validate,
    togglePageTheme, addToLocalStorage, createProductsTable, clearData, deleteProduct, deleteAllProducts,
    getSelectedProduct, setPageTheme, loadPageTheme
};