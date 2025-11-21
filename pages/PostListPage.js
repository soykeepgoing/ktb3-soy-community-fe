import { PostList } from "../components/posts/PostList.js";
import {Header} from "../components/header/Header.js";
import { Banner } from "../components/banner/Banner.js";
import { attachPostListEvents } from "../handle/posts/handlePostListEvents.js";

export function PostListPage(){
    const header = Header();
    const banner = Banner();
    const postListSection = PostList();
    attachPostListEvents(postListSection);

    const postListMain = document.createElement("div");
    postListMain.classList.add("postListMain");
    postListMain.appendChild(banner);
    postListMain.appendChild(postListSection);

    const postListPage = document.createElement("div");
    postListPage.append(header);
    postListPage.append(postListMain);

    return postListPage;
}