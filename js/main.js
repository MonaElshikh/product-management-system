import * as productManagment from "/js/product-managment.js";
import { openModal, closeModal, modal } from "/js/model-popup.js";
const modeDesign = ` <!-- Modal content -->
<div class="modal-content">
  <div class="modal-header">
    <span class="close">&times;</span>
    <h3></h3>
  </div>
  <div class="modal-body">
    <p></p>
    <div>
      <button id="btnYes" class="actions-buttons">Yes</button>
      <button id="btnNo" class="actions-buttons">No</button>
    </div>
  </div>
</div>`;
//#region Calls
//load  products
productManagment.loadProducts();
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
    }
});
// search by title button
productManagment.btnSearchByTitle.addEventListener("click", function () {
    if (productManagment.search.value) {
        productManagment.searchByTitle(productManagment.search.value);
    }
    else {
        return false;
    }
});
// search by category
productManagment.btnSearchByCat.addEventListener("click", function () {
    if (productManagment.search.value) {
        productManagment.searchByCategory(productManagment.search.value);
    }
    else {
        return false;
    }
});
// Reset search
productManagment.search.addEventListener("keyup", function (e) {
    if (e.target.value.length == 0) {
        productManagment.loadProducts();
    }
});
// cancel button
productManagment.btnCancel.addEventListener("click", function () {
    productManagment.clearData(true);
});
// DeleteAll button
productManagment.btnDeleteAll.addEventListener("click", function () {
    openModal(modeDesign, "Delete All! Are your sure?", "Delete All", "sm", true);
});
// edit/delete product
productManagment.contentTable.addEventListener("click", function (e) {
    productManagment.getSelectedProduct(e);
    switch (e.target.innerHTML) {
        case "Delete":
            openModal(modeDesign, "Delete! Are your sure?", "Delete", "sm", false);
            break;
        case "Update":
            productManagment.editProduct();
            break;
    }
});

// model popup actions
modal.addEventListener("click", function (e) {
    closeModal();
    if (e.target.hasAttribute("data-deleteall")) { // delete all button clicked
        if (e.target.innerHTML == "Yes") {
            productManagment.productsNumber.innerHTML = `(0) Products`;
            productManagment.btnDeleteAll.style.display = "none";
            productManagment.deleteAllProducts();
        }
    }
    else // delete record button clicked
    {
        if (e.target.innerHTML == "Yes") {
            productManagment.deleteProduct(e);
        }
    }
});
//#endregion