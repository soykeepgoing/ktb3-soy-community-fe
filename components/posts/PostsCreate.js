import {createPost} from "../../api/postApi.js";
import { handlePostCreate } from "../../handle/handlePostCreate.js";

export function PostsCreate(){
    const section = document.createElement("section");
    section.className = "post-create";
    section.innerHTML = `
        <h2>게시글 작성</h2>
        <form>
        <label>제목*</label>
        <input id="post-title" type="text" placeholder="제목을 입력해주세요. (최대 26글자)">
        
        <label>내용*</label>
        <textarea id="post-body" placeholder="내용을 입력해주세요."></textarea>

        <label>이미지</label>
        <input id="post-image" type="file">
        <p class="helper-text">* helper text</p>

        <button id="btn-post-create" class="btn-primary">작성 완료</button>
        </form>`;

    const submitBtn = section.querySelector("#btn-post-create");
    submitBtn.addEventListener("click", async (event) => {
        handlePostCreate(event);
    });

    return section;
}