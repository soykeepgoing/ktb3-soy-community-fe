import { getPosts } from "../../api/postApi.js";
import { PostItem } from "./PostItem.js";
import { navigateTo } from "../../core/Router.js";
const DEFAULT_SIZE = 8;
let page = 0;
export function FeedSection(){
    page = 0;
    const section = document.createElement("section");
    section.className = "feedSection";
    section.appendChild(PostItemContainer());
    section.appendChild(ScrollObserver());

    handlePostItemContainer(section);
    return section;
}

function ScrollObserver(){
    const div = document.createElement("div");
    div.className = "scrollObserver";
    div.id = "scrollObserver";
    return div;
}

export function PostItemContainer(){
    const section = document.createElement("section");
    section.className = "postItemContainer";
    section.id = "postItemContainer";
    return section;
}

function createFragment(postsData) {
    const fragment = document.createDocumentFragment(); 

    postsData.forEach(postData => {
        const post = PostItem(postData);
        const postId = postData.id;

        post.addEventListener("click", () => navigateTo(`/posts/${postId}`));
        fragment.appendChild(post);
    });

    return fragment; 
}

async function handlePostItemContainer(section){
    const postItemContainer = section.querySelector("#postItemContainer");
    const scrollObserver = section.querySelector("#scrollObserver");

    /* 초기화 */
    const response = await getPosts(page, DEFAULT_SIZE);
    const data = response.data;
    const postItemData = data.postItemResponseList;
    postItemContainer.appendChild(createFragment(postItemData));
    page++;
    
    const options = {
        root: null, 
        rootMargin: '0px 0px 240px 0px', 
        threshold: 0
    };

    async function onIntersect(entries, observer){
        for (const entry of entries){
            if (!entry.isIntersecting) continue;
            
            const response = await getPosts(page, DEFAULT_SIZE);
            const data = response.data;
            const postItemData = data.postItemResponseList;

            if(postItemData.length === 0){
                observer.unobserve(entry.target);
                return;
            }
            page++;
            postItemContainer.appendChild(createFragment(postItemData));
        }
    }

    const observer = new IntersectionObserver(onIntersect, options);
    observer.observe(scrollObserver);
}