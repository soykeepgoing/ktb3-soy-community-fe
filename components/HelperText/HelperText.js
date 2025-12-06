import {h} from "../../core/vdom/h.js";

export function HelperText(text = ""){
    return h("p", {className: "helper-text"}, text);
}