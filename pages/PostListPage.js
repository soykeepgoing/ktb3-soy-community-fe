import { PostList } from "../components/posts/PostList.js";
import { attachPostListEvents } from "../handle/posts/handlePostListEvents.js";

export function PostListPage(){
    const section = PostList();
    attachPostListEvents(section);
    return section;
}