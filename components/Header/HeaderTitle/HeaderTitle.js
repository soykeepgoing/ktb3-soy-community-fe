import { h } from "../../../core/vdom/h.js";

export function HeaderTitle(){
    return h("h1", 
            {className: "header__title"},
            "Dancing Tomato Club"
    );
}