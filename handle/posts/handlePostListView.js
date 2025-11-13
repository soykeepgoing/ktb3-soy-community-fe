import {getPosts} from "../../api/postApi.js";
import {PostItem} from "../../components/posts/PostItem.js";

export function renderPostList(postsData) {
    const fragment = document.createDocumentFragment(); 

    postsData.forEach(postData => {
        const post = PostItem(postData);
        fragment.appendChild(post);
    });

    return fragment; 
}

export async function handlePostListView(domPostList, currentPage, page_size) {
    try {
        const data = await getPosts(currentPage, page_size);
        const posts = data.postItemResponseList;

        if (!posts || posts.length === 0) {
            return false; 
        }

        const postFragment = renderPostList(posts);
        domPostList.appendChild(postFragment);
        
        return true; 

    } catch (err) {
        console.error("게시글 목록 조회 실패:", err);
        return false; 
    }
}