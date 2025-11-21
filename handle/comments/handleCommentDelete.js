import { ModalDelete } from "../../components/ModalDelete.js";
import {deleteComments} from "../../api/commentApi.js"
import { navigateTo } from "../../core/router.js";

export function handleDeleteComments(postId, commentId){

    const titleMsg = "댓글을 삭제하시겠습니까?";
    const contentMsg = "삭제한 내용은 복구 할 수 없습니다.";

    ModalDelete(titleMsg, contentMsg);

    const modal = document.getElementById("modal-delete");

    const btnConfirm = modal.querySelector("#btn-confirm");
	const btnCancel = modal.querySelector("#btn-cancel");

	btnCancel.addEventListener("click", 
        () => modal.remove()
    );

    const userId = localStorage.getItem("userId");

	btnConfirm.addEventListener("click", async () => {
		await deleteComments(postId, commentId, userId);
		modal.remove();
        navigateTo(`/posts/${postId}`);
	})

}