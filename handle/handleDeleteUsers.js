import {ModalDelete} from "../components/ModalDelete.js";
import {deleteUser} from "../api/userApi.js";

export function handleDeleteUsers(titleMsg, contentMsg, userId){
    ModalDelete(titleMsg, contentMsg);

    const modal = document.getElementById("modal-delete");

    const btnConfirm = modal.querySelector("#btn-confirm");
    const btnCancel = modal.querySelector("#btn-cancel");

    btnCancel.addEventListener("click", 
        () => modal.remove()
    );

    btnConfirm.addEventListener("click", () => {
        deleteUser(userId);
        modal.remove();
    })
}