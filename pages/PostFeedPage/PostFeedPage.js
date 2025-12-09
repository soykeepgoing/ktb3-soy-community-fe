import { h } from "../../core/vdom/h.js";
import { Header } from "../../components/Header/Header/Header.js"
import { BannerSection } from "../../components/Banner/BannerSection/BannerSection.js";
export function PostFeedPage(){
    return h("div", 
        null, 
        Header(),
        BannerSection()
    );
}