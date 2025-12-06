import { h } from "../../core/vdom/h.js";

export function LinkTo({text, onClick}){
    return h("div", {className : "link_to", onClick}, text);
}