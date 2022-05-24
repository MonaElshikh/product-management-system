
//#region Declaration
let modal = document.querySelector(".modal");
let modelContent;
let modelHeader;
let modelBody;
let btnYes;
let btnNo;
//#endregion

//#region Methods
function openModal(modalDesign, message, header, size, deleteAll = false) {
    modal.innerHTML = modalDesign;
    modelContent = document.querySelector(".modal-content");
    modelHeader = document.querySelector(".modal-header>h3");
    modelBody = document.querySelector(`.modal-body>p`);
    if (header !== "") {
        modelHeader.innerHTML = header
    } else {
        modelHeader.style.display = "none";
    }
    switch (size) {
        case "sm":
            modelContent.style.width = "30%";
            break;
        case "lg":
            modelContent.style.width = "80%";
            break;
        default:
            modelContent.style.width = "50%";
            break;
    }
    if (deleteAll) {
        btnYes = document.querySelector("#btnYes");
        btnNo = document.querySelector("#btnNo");
        btnYes.setAttribute("data-deleteAll", "");
        btnNo.setAttribute("data-deleteAll", "");
    }
    modelBody.innerHTML = message;
    modal.style.display = "block";
}
function closeModal() {
    modal.removeChild(modelContent);
    modal.style.display = "none";
}
//#endregion
export { openModal, closeModal, modal };