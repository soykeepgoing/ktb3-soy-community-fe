import {ModalDelete} from "../../components/ModalDelete.js";
import {deleteUser} from "../../api/userApi.js";
import { navigateTo } from "../../core/router.js";

export function handleUserDelete(titleMsg, contentMsg, userId){
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
        navigateTo("/");
        localStorage.clear();
    })
}