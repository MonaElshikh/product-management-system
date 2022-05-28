
//#region imporst
import * as productManagment from "/js/product-managment.js";
import modalPopup from "/js/model-popup.js";
//#endregion

//#region  Declaration
let modal = new modalPopup("myModal", "");
//#endregion

//#region Calls
//load  products
productManagment.loadProducts();

// load page theme 
productManagment.loadPageTheme();

// change page color mode
productManagment.colorIndicator.addEventListener("click", function () {
    productManagment.togglePageTheme();
});
//calculate total price after moving from in ads button input
productManagment.ads.addEventListener("blur", function () {
    productManagment.total.innerHTML =
        parseInt(productManagment.price.value)
        + parseInt(productManagment.taxes.value)
        + parseInt(productManagment.ads.value);
});

// sub the discount if it is found
productManagment.discount.addEventListener("blur", function () {
    productManagment.total.innerHTML =
        parseInt(productManagment.price.value)
        + parseInt(productManagment.taxes.value)
        + parseInt(productManagment.ads.value)
        - parseInt(productManagment.discount.value);
});

//Create button
productManagment.btnCreate.addEventListener("click", function () {
    if (productManagment.validate()) {
        if (this.innerHTML === "Update") {
            productManagment.updateProduct();
        }
        else {
            productManagment.addProducts(parseInt(productManagment.count.value));
        }
        productManagment.loadPageTheme();
    }
});

// search by title button
productManagment.btnSearchByTitle.addEventListener("click", function () {
    if (productManagment.search.value) {
        productManagment.searchByTitle(productManagment.search.value);
        productManagment.loadPageTheme();
    }
    else {
        return false;
    }
});

// search by category
productManagment.btnSearchByCat.addEventListener("click", function () {
    if (productManagment.search.value) {
        productManagment.searchByCategory(productManagment.search.value);
        productManagment.loadPageTheme();
    }
    else {
        return false;
    }
});

// Reset search
productManagment.search.addEventListener("keyup", function (e) {
    if (e.target.value.length == 0) {
        productManagment.loadProducts();
        productManagment.loadPageTheme();
    }
});

// cancel button
productManagment.btnCancel.addEventListener("click", function () {
    productManagment.clearData(true);
    productManagment.loadPageTheme();
});

// DeleteAll button
productManagment.btnDeleteAll.addEventListener("click", function () {
    modal.open("Delete All! Are your sure?", "Delete All", "", true);
});

// edit/delete product
productManagment.contentTable.addEventListener("click", function (e) {
    productManagment.getSelectedProduct(e);
    switch (e.target.innerHTML) {
        case "Delete":
            modal.open("Delete! Are your sure?", "Delete", "", false);
            break;
        case "Update":
            productManagment.editProduct();
            productManagment.loadPageTheme();
            break;
    }
});

// model popup actions
document.addEventListener("click", function (e) {
    let id = e.target.getAttribute("id");
    switch (id) {
        case "btnClose":
        case "btnNo":
            modal.close();
            productManagment.loadPageTheme();
            break;
        case "btnYes":
            if (e.target.hasAttribute("data-deleteall")) { // delete all button clicked
                console.log(`delete all record`);
                productManagment.productsNumber.innerHTML = `(0) Products`;
                productManagment.btnDeleteAll.style.display = "none";
                productManagment.deleteAllProducts();
            }
            else {// delete record button clicked
                console.log(`delete one record`);
                productManagment.deleteProduct();
            }
            modal.close();
            productManagment.loadPageTheme();
            break;
    }

});

//#endregion