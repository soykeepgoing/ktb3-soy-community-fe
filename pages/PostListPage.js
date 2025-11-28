import { FeedSection } from "../components/Posts/FeedSection.js";
import {Header} from "../components/Header/Header.js";
import { Banner } from "../components/Banner/Banner.js";
import { FloatingButton } from "../components/FloatingButton/FloatingButton.js";

export function PostListPage(){
    const header = Header();
    const banner = Banner();
    const feedSection = FeedSection();
    const floatingBtn = FloatingButton({value: "+", url: "/posts/create"});

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