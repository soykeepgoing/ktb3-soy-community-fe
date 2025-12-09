import { h } from "../../core/vdom/h.js";
import { Header } from "../../components/Header/Header/Header.js"
import { BannerSection } from "../../components/Banner/BannerSection/BannerSection.js";
import { FeedSection } from "../../components/FeedSection/FeedSection.js";

export function PostFeedPage(){
    return h("div", 
        {className: "post-feed-page"}, 
        Header(),
        BannerSection(),
        FeedSection()
    );
}