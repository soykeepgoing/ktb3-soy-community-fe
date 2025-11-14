
export function ModalDelete(titleMsg, contentMsg){    
    const modal = document.createElement("div");
    modal.classList.add("modal-wrapper");
	modal.id = "modal-delete";

	modal.innerHTML = `
		<div class="model-box">
			<h2 class="modal-title">${titleMsg}</h2>
			<p class="modal-content">${contentMsg}</p>
			<div class="modal-buttons">
				<button id="btn-confirm" class="btn-confirm">확인</button>
				<button id="btn-cancel" class="btn-cancel">취소</button>
			</div>
		</div>`;

	document.body.appendChild(modal);

}