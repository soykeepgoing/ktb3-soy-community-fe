import { h } from "../../../core/vdom/h.js";

export function EmailInfo(){
    return h("div", {}, 
        h("label", {}, "이메일"), 
        h("p", {}, "user@example.com")
    );
}