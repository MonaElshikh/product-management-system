//#region Declaration
class Product {
    // private properties
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
let products = [];
//#endregion Declaration

//#region  get page controls
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
let contentTable = document.querySelector(".data-table>tbody:last-child");
//#endregion

//#region Actions
//load  products
loadProducts();
//calculate total price after moving from discount input
discount.addEventListener("blur", function () {
    total.innerHTML = parseInt(price.value) + parseInt(taxes.value) + parseInt(ads.value) - parseInt(discount.value);
});
//Create button
btnCreate.addEventListener("click", function () {
    addProducts(parseInt(count.value));
});
// DeleteAll button
btnDeleteAll.addEventListener("click", function () {
    deleteAllProducts();
})
//load all products from local storage
function loadProducts() {
    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"));
        console.log(` products: ${products}`);
        createProductsTable(products);
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
    addToLocalStorage(products);
    createProductsTable(products);
    clearData();
}
//add products to local storage
function addToLocalStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function createProductsTable(products) {
    contentTable.innerHTML = "";
    products.forEach((product) => {
        console.log(`current product: ${product.price}`);
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
        btnUpdate.className = "actions-buttons";
        tdUpdate.appendChild(btnUpdate);
        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "Delete";
        btnUpdate.style.cursor = "pointer";
        btnDelete.className = "actions-buttons";
        btnDelete.style.cursor = "pointer";
        tdDelete.appendChild(btnDelete);
        tr.append(tdId, tdTitle, tdPrice, tdTaxes, tdAds, tdDiscount, tdTotal, tdCategory, tdUpdate, tdDelete);
        contentTable.appendChild(tr);
    });
}
//clear product data from fields  after adding it 
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    category.value = "";
    total.innerHTML = "";
    count.value = "";
}
function deleteAllProducts() {
    localStorage.clear();
    contentTable.innerHTML = "";
}
//#endregion
//#region Print
// console.log(title);
// console.log(price);
// console.log(taxes);
// console.log(ads);
// console.log(discount);
// console.log(total);
// console.log(count);
// console.log(category);
// console.log(search);
// console.log(btnCreate);
// console.log(btnSearchByTitle);
// console.log(btnSearchByCat);
// console.log(btnDeleteAll);
// console.log(btnDelete);
// console.log(btnUpdate);
//#endregion