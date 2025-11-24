import { createPost } from "../../api/postApi.js";
import {navigateTo} from "../core/Router.js";
import {getState} from "../core/GlobalStore.js";
import { postImageFile } from "../../api/postApi.js";
import { Dropdown } from "../components/Dropdown/Dropdown.js";
import { PostsCreateSection } from "../components/posts/PostsCreateSection.js";

let selectedTopic = null; 

export function PostCreatePage(){
    const postCreate = PostsCreateSection();
    attachPostCreate(postCreate);
    
    const dropdownHashtag = Dropdown({
        placeholder: "오늘 칭찬할 일 찾기 ▾", 
        options: [
            { value: "food", label: "#한입의기쁨" },
            { value: "purchase", label: "#득템로그" },
            { value: "contents", label: "#인생콘텐츠" },
            { value: "music", label: "#듣는마약" },
            { value: "activity", label: "#피지컬파워" }
        ],
        className: "topic_dropdown"
    });

    dropdownHashtag.addEventListener("select", (e) => {
        selectedTopic = e.detail.value;
        console.log("선택된 해시태그:", selectedTopic);
    });

    const div = document.createElement("div");
    div.appendChild(dropdownHashtag);
    div.appendChild(postCreate);
    div.classList.add("post-create-container");

    return div;
}

async function attachPostCreate(section){
    const postContent = section.querySelector("#post-content");
    const postImgFile = section.querySelector("#post-image");
    const userId = getState("userId");
    const submitBtn = section.querySelector("#btn-post-create");
    const helperTextBody = section.querySelector("#helper-text-content");

    postContent.addEventListener("input", () => {
        const value = postContent.value.trim();

        if (value === ""){
            helperTextBody.textContent = "내용을 입력해주세요.";
            submitBtn.disabled = true;
        } else {
            helperTextBody.textContent = "";
            submitBtn.disabled = false;
        }
    })

    submitBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        const newPost = {
            "topicCode": selectedTopic, 
            "postContent": postContent.value
        };

        const {state, postId} = await createPost(newPost, userId);
        if (state){
            console.log("게시글 작성 완료");
            await navigateTo("/posts");
        } 
    
        if (postImgFile.files.length > 0){
            const file = postImgFile.files[0];
            await postImageFile(postId, file);
        }
    });
}