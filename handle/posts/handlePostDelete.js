import { ModalDelete } from "../../components/ModalDelete.js";
import {deletePost} from "../../api/postApi.js"
import { navigateTo } from "../../core/router.js";

export function handlePostDelete(titleMsg, contentMsg, postId){
    ModalDelete(titleMsg, contentMsg);

    const modal = document.getElementById("modal-delete");

    const btnConfirm = modal.querySelector("#btn-confirm");
	const btnCancel = modal.querySelector("#btn-cancel");

	btnCancel.addEventListener("click", 
        () => modal.remove()
    );

    const userId = localStorage.getItem("userId");

	btnConfirm.addEventListener("click", async () => {
		await deletePost(postId, userId);
		modal.remove();
        navigateTo("/posts");
	})

}