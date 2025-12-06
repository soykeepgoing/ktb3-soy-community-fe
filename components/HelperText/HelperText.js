import {h} from "../../core/vdom/h.js";

export function HelperText({text = "", invalid}){
    const className = `helper-text ${invalid ? 'invalid': ''}`;

    return h("p", {className}, text);
}