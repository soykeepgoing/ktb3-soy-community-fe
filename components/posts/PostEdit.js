import { handlePostDetailView } from "../../handle/handlePostDetailView.js";
import {handlePostEdit} from "../../handle/handlePostEdit.js";
import { navigateTo } from "../../router/router.js";

export function PostEdit(postId){
    const section = document.createElement("section");
    console.log(postId);
    handlePostDetailView(postId).then(
        postDetailData =>{
            section.innerHTML = `
            <h2>게시글 수정</h2>
            <form>
                <label>제목*</label>
                <input type="text" id="post-title" value=${postDetailData.title}>

                <label>내용*</label>
                <textarea id="post-body">${postDetailData.body}</textarea>

                <label>이미지</label>
                <input type="file">
                <p class="helper-text">기존 이미지: example.jpg</p>
            <button id="btn-post-edit" "class="btn-primary">수정하기</button>
            </form>`;
        
            const btnPostEdit = section.querySelector("#btn-post-edit");
            btnPostEdit.addEventListener("click", async (event) => {
                handlePostEdit(event, postId);
                navigateTo(`/posts/${postId}`);
            });
        }
    );


    return section

}