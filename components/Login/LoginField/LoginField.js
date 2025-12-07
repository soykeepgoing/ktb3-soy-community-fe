import { h } from "../../../core/vdom/h.js";

export function LoginField({label, type, id, placeholder, value, onInput, onBlur}){
    return h("div", { className: "login-field"},
        h("label", null, label),
        h("input",{
            type, 
            id,
            placeholder,
            value,
            onInput,
            onBlur
        })
    );
}