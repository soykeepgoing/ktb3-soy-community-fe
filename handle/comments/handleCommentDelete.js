import { ModalDelete } from "../../components/users/ModalDelete.js";
import {deleteComments} from "../../api/commentApi.js"

export function handleDeleteComments(message, postId, commentId){
    ModalDelete(message);

    const modal = document.getElementById("modal-delete");

    const btnConfirm = modal.querySelector("#btn-confirm");
	const btnCancel = modal.querySelector("#btn-cancel");

	btnCancel.addEventListener("click", 
        () => modal.remove()
    );

    const userId = localStorage.getItem("userId");

	btnConfirm.addEventListener("click", () => {
		deleteComments(postId, commentId, userId);
		modal.remove();
	})

}