import { ModalDelete } from "../components/ModalDelete.js";
import {deletePost} from "../api/postApi.js"

export function handleDeleteContents(message, postId){
    ModalDelete(message);

    const modal = document.getElementById("modal-delete");

    const btnConfirm = modal.querySelector("#btn-confirm");
	const btnCancel = modal.querySelector("#btn-cancel");

	btnCancel.addEventListener("click", 
        () => modal.remove()
    );

    const userId = localStorage.getItem("userId");

	btnConfirm.addEventListener("click", () => {
		deletePost(postId, userId);
		modal.remove();
	})

}