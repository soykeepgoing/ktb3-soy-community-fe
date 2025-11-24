export function PostEdit(data){
    const section = document.createElement("section");
    section.classList.add("post-edit-box");
    section.innerHTML = `
        <h2>게시글 수정</h2>
        <form>
            <label>내용*</label>
            <textarea id="post-body">${data.content}</textarea>

            <label>이미지</label>
            <input id="post-img" type="file">
            <p class="helper-text"></p>
            <button id="btn-post-edit" class="btn-primary">수정하기</button>
        </form>`;

    return section
}