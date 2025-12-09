import { h } from "../../../core/vdom/h.js";
import { BannerLabel } from "../BannerLabel/BannerLabel.js";
import { BannerTopic } from "../BannerTopic/BannerTopic.js";
export function BannerSection(){
    return h("section", 
        {className: "banner_section"}, 
        BannerLabel(), 
        BannerTopic()
    )
}