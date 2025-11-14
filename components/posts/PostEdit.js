export function PostEdit(data){
    const section = document.createElement("section");
    section.classList.add("post-edit-box");
    section.innerHTML = `
        <h2>게시글 수정</h2>
        <form>
            <label>제목*</label>
            <input type="text" id="post-title" value="${data.title}">

            <label>내용*</label>
            <textarea id="post-body">${data.body}</textarea>

            <label>이미지</label>
            <input type="file">
            <p class="helper-text">기존 이미지: example.jpg</p>
            <button id="btn-post-edit" "class="btn-primary">수정하기</button>
        </form>`;

    return section
}