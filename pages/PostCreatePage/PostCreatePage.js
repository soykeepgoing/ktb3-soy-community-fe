import { h } from "../../core/vdom/h.js";

import { PostCreateSection } from "../../components/PostCreateSection/PostCreateSection.js";
import { TopicDropdown } from "../../components/TopicDropdown/TopicDropdown.js";

export function PostCreatePage(){
    return h("div", {className: "post-create-page"}, 
        TopicDropdown(),
        PostCreateSection()
    );
}