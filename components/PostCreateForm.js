import {createPost} from "../api/postApi.js";


export function PostCreateForm(){

    const container = document.createElement("section");
    container.class = "post-create"

    container.innerHTML = `
        <h2>게시글 작성</h2>
        <form>
        <label>제목*</label>
        <input id="post-title" type="text" placeholder="제목을 입력해주세요. (최대 26글자)">
        
        <label>내용*</label>
        <textarea id="post-body" placeholder="내용을 입력해주세요."></textarea>

        <label>이미지</label>
        <input type="file">
        <p class="helper-text">* helper text</p>

        <button id="post-submit-button" class="btn-primary">작성 완료</button>
        </form>`;

    const submitBtn = document.getElementById("post-submit-button");

    submitBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const postTitle = document.getElementById("post-title").value.trim();
        const postBody = document.getElementById("post-body").value.trim();
        console.log('hi');
        const userId = localStorage.getItem("userId");

        const newPost = {
            "postTitle": postTitle, 
            "postBody": postBody};


        try {
            await createPost(newPost);
            alert("게시글이 등록되었습니다!");
            navigateTo("post-list");
        } catch (err) {
            console.log("게시글 등록 실패: " + err); }
    });

}