
export function ModalDelete(message){    
    const modal = document.createElement("div");
    modal.classList.add("modal-wrapper");
	modal.id = "modal-delete";

	modal.innerHTML = `
		<div>
			<div>${message}</div>
			<p>삭제한 내용은 복구할 수 없습니다.</p>

			<div>
				<button id="btn-confirm">확인</button>
				<button id="btn-cancel">취소</button>
			</div>
		</div>`;

	document.body.appendChild(modal);

}