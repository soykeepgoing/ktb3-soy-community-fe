import { handlePostListView } from "./handlePostListView.js";
import { navigateTo } from "../../router/router.js";

const DEFAULT_SIZE = 5;

export async function attachPostListEvents(section){
    let currentPage = 0;
    let isMore = true;

    const createBtn = section.querySelector("#post-create-btn");
    const postList = section.querySelector("#post-list");

    createBtn.addEventListener("click", () => navigateTo("/posts/create"));
    
    handlePostListView(postList, currentPage, DEFAULT_SIZE);
    currentPage++;

    // // 스크롤 감지
    window.addEventListener("scroll", () => {
        if (!isMore) {return;}
        const nearBottom =
            window.innerHeight + window.scrollY >= document.body.offsetHeight;

        console.log("hi");
        console.log(nearBottom);

        if (nearBottom) {
            isMore = handlePostListView(postList, currentPage, DEFAULT_SIZE);
            currentPage++;
        }
    });

}
