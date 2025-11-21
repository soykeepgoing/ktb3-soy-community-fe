import { createPost } from "../../api/postApi.js";
import { navigateTo } from "../../core/router.js";
import { postImageFile } from "../../api/postApi.js";
import { handleInvalidTitle, handleInvalidBody} from "./handleValidation.js";
export async function attachPostCreate(section){
    
    const postTitle = section.querySelector("#post-title");
    const postBody = section.querySelector("#post-body");
    const postImgFile = section.querySelector("#post-image");
    const userId = localStorage.getItem("userId");
    const submitBtn = section.querySelector("#btn-post-create");

    const helperTextTitle = section.querySelector("#helper-text-title");
    const helperTextBody = section.querySelector("#helper-text-body");

    function validateAll() {
        let titleValid = handleInvalidTitle(helperTextTitle, postTitle.value);
        let bodyValid = handleInvalidBody(helperTextBody, postBody.value);

            // 버튼 활성화
            submitBtn.disabled = !(titleValid && bodyValid);
    }
    
    postTitle.addEventListener("input", validateAll);
    postBody.addEventListener("input", validateAll);

    submitBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const newPost = {
            "postTitle": postTitle.value, 
            "postContent": postBody.value
        };

        const {state, postId} = await createPost(newPost, userId);
        if (state){
            console.log("게시글 작성 완료");
            navigateTo("/posts");
        } 
    
        if (postImgFile.files.length > 0){
            const file = postImgFile.files[0];
            await postImageFile(postId, file);
        }
    });
}