
class Modal {
    modal;
    modelContent;
    modelHeader;
    modelBody
    btnYes;
    btnNo;
    btnClose;
    size = { sm: "30%", md: "50%", lg: "80%" };
    modalDesign = ` 
    <!-- Modal content -->
    <div class="modal-content">
    <div class="modal-header">
        <span id="btnClose" class="close">&times;</span>
        <h4></h4>
    </div>
    <div class="modal-body">
        <p></p>
        <div>
        <button id="btnYes" class="actions-buttons">Yes</button>
        <button id="btnNo" class="actions-buttons">No</button>
        </div>
    </div>
    </div>`;
    constructor(modalId, design) {
        this.modal = document.querySelector(`#${modalId}`);
        this.modal.innerHTML = design || this.modalDesign;
        this.modelContent = document.querySelector(".modal-content");
        this.modelHeader = document.querySelector(".modal-header>h4");
        this.modelBody = document.querySelector(`.modal-body>p`);
        this.btnYes = document.querySelector("#btnYes");
        this.btnNo = document.querySelector("#btnNo");
        this.btnClose = document.querySelector("#btnClose");
    }
    open(message, header, size, deleteAll = false) {
        this.modal.style.display = "block";
        this.modelHeader.innerHTML = header;
        this.modelBody.innerHTML = message;
        this.modelContent.style.width = this.size[size] || this.size["sm"];
        if (deleteAll) {
            this.btnYes.setAttribute("data-deleteAll", "");
            this.btnNo.setAttribute("data-deleteAll", "");
        }
        else {
            this.btnYes.removeAttribute("data-deleteAll");
            this.btnNo.removeAttribute("data-deleteAll");
        }
    }
    close() {
        this.modal.style.display = "none";
    }
}
//#region Methods
// function openModal(design, message, header, size, deleteAll = false) {
//     modal.innerHTML = design || modalDesign;
//     modelContent = document.querySelector(".modal-content");
//     modelHeader = document.querySelector(".modal-header>h3");
//     modelBody = document.querySelector(`.modal-body>p`);
//     if (header !== "") {
//         modelHeader.innerHTML = header
//     } else {
//         modelHeader.style.display = "none";
//     }
//     switch (size) {
//         case "sm":
//             modelContent.style.width = "30%";
//             break;
//         case "lg":
//             modelContent.style.width = "80%";
//             break;
//         default:
//             modelContent.style.width = "50%";
//             break;
//     }
//     if (deleteAll) {
//         btnYes = document.querySelector("#btnYes");
//         btnNo = document.querySelector("#btnNo");
//         btnYes.setAttribute("data-deleteAll", "");
//         btnNo.setAttribute("data-deleteAll", "");
//     }
//     modelBody.innerHTML = message;
//     modal.style.display = "block";
// }
// function closeModal() {
//     modal.removeChild(modelContent);
//     modal.style.display = "none";
// }
//#endregion
export default Modal;