import { h } from "../../../core/vdom/h.js";

export function PostItemPreview({content}){{
    return h("p", {className: "postItem-preview"}, content);
}}