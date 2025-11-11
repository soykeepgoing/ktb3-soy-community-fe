import {PostItem} from "./PostItem.js"

export function PostLists(postsData){
    const list = document.createElement("div");
    list.classList.add("post");

    postsData.forEach(postData => {
        const post = PostItem(postData);
        list.appendChild(post);
    });

    return list; 
}