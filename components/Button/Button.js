import {h} from "../../core/vdom/h.js";

export function Button({ className = "button", id, text, disabled, onClick }) {
    return h(
        "button",
        {
        className,
        id,
        disabled,
        onClick   
        },
        text
    );
}
