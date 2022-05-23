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
let productId;
let scrollY;
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
//#endregion

//#region  Methods
//load all products from local storage
function loadProducts() {
    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"));
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
function editProduct(e) {
    if (e.target.parentElement.parentElement.hasAttribute("data-index")) {
        productId = e.target.parentElement.parentElement.getAttribute("data-index");
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
    addToLocalStorage(products);
    loadProducts();
    clearData(true);
}
function deleteProduct(e) {
    if (e.target.parentElement.parentElement.hasAttribute("data-index")) {
        productId = e.target.parentElement.parentElement.getAttribute("data-index");
        products = products.filter(p => p.id != productId);
    }
    addToLocalStorage(products);
    loadProducts();
}
//add products to local storage
function addToLocalStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
}
function createProductsTable(products) {
    contentTable.innerHTML = "";
    btnDeleteAll.innerHTML = `Delete All (${products.length})`;
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
function clearData(cancelUpdate = false) {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    category.value = "";
    total.innerHTML = "";
    count.value = "";
    if (cancelUpdate) {
        btnCreate.innerHTML = "Create";
        btnCreate.classList.remove("btn-small");
        btnCreate.classList.add("btn-big");
        btnCancel.style.display = "none";
        count.style.display = "block";
        divAddButtons.classList.remove("search-buttons");
    }
}
function deleteAllProducts() {
    localStorage.clear();
    contentTable.innerHTML = "";
}
//#endregion
export {
    Product, productId, products, scrollY, title, price, taxes, ads,
    discount, total, count, category, search, btnCreate, btnSearchByTitle,
    btnSearchByCat, btnDeleteAll, btnCancel, contentTable, divAddButtons, divContainer, body,
    loadProducts, addProducts, editProduct, updateProduct,
    addToLocalStorage, createProductsTable, clearData, deleteProduct, deleteAllProducts
};