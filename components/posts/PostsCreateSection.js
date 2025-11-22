export function PostsCreateSection(){
    const section = document.createElement("section");
    section.className = "post-create";
    section.innerHTML = `
        <form>
        <label>내용*</label>
        <textarea id="post-content" placeholder="내용을 입력해주세요."></textarea>
        <p class="helper-text" id="helper-text-content"></p>

        <label>이미지</label>
        <input id="post-image" type="file">

        <button id="btn-post-create" class="btn-primary" disabled>작성 완료</button>
        </form>`;
    return section;
}