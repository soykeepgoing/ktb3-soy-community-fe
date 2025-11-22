import { FeedSection } from "../components/posts/PostItemContainer.js";
import {Header} from "../components/header/Header.js";
import { Banner } from "../components/banner/Banner.js";
import { FloatingButton } from "../components/FloatingButton.js";

export function PostListPage(){
    const header = Header();
    const banner = Banner();
    const feedSection = FeedSection();
    const floatingBtn = FloatingButton();

    const main = document.createElement("div");
    main.classList.add("homeMain");
    main.appendChild(banner);
    main.appendChild(feedSection);
    main.appendChild(floatingBtn);

    const postListPage = document.createElement("div");
    postListPage.append(header);
    postListPage.append(main);

    return postListPage;
}