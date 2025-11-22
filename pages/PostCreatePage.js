import { createPost } from "../../api/postApi.js";
import { navigateTo } from "../../core/router.js";
import { postImageFile } from "../../api/postApi.js";
import { Dropdown } from "../components/Dropdown.js";
import { PostsCreateSection } from "../components/posts/PostsCreateSection.js";

let selectedTopic = null; 

export function PostCreatePage(){
    const postCreate = PostsCreateSection();
    attachPostCreate(postCreate);
    
    const dropdownHashtag = Dropdown({
        placeholder: "오늘 칭찬할 일 찾기", 
        options: [
            { value: "food", label: "#오늘 나를 웃게 만든 한입" },
            { value: "purchase", label: "#오늘의 득템 순간" },
            { value: "scene", label: "#오늘 여운 남긴 장면 하나" },
            { value: "contents", label: "#오늘 발견한 취향 콘텐츠" },
            { value: "music", label: "#오늘 리듬 탄 플레이리스트" },
            { value: "activity", label: "#오늘 움직임 속에서 찾은 작은 행복" },
        ]
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
    const userId = localStorage.getItem("userId");
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
            "topic": selectedTopic, 
            "content": postContent.value
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