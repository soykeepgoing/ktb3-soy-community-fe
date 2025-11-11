import { PostLists } from "../components/posts/PostList.js";
import {getPosts} from "../api/postApi.js";

export async function handlePostsView(currentPage, page_size){
    try{
        const data = await getPosts(currentPage, page_size);
        const posts = data.postItemResponseList;

        const postList = PostLists(posts);
        const domPostList = document.getElementById("post-list");
        domPostList.appendChild(postList);
    } catch (err) {
    console.error("게시글 목록 조회 실패:", err);
  }
}