import * as productManagment from "/js/product-managment.js";
//#region Actions
//load  products
productManagment.loadProducts();
//calculate total price after moving from in ads button input
productManagment.ads.addEventListener("blur", function () {
    productManagment.total.innerHTML = parseInt(productManagment.price.value || 0)
        + parseInt(productManagment.taxes.value || 0)
        + parseInt(productManagment.ads.value || 0);
});
// sub the discount if it is found
productManagment.discount.addEventListener("blur", function () {
    productManagment.total.innerHTML = parseInt(price.value || 0)
        + parseInt(taxes.value || 0) + parseInt(ads.value || 0)
        - parseInt(discount.value || 0);
});

//Create button
productManagment.btnCreate.addEventListener("click", function () {
    if (this.innerHTML === "Update") {
        productManagment.updateProduct();
    }
    else {
        productManagment.addProducts(parseInt(productManagment.count.value || 1));
    }
});
// cancel button
productManagment.btnCancel.addEventListener("click", function () {
    productManagment.clearData(true);
});
// DeleteAll button
productManagment.btnDeleteAll.addEventListener("click", function () {
    productManagment.deleteAllProducts();
})
// edit/delete product
productManagment.contentTable.addEventListener("click", function (e) {
    if (e.target.innerHTML === "Delete") {
        let _confirm = confirm("Delete! Are you sure?");
        if (_confirm) {
            productManagment.deleteProduct(e);
        }
    } else {
        productManagment.editProduct(e);
    }
})

//#endregion

//#region Print
//#endregion