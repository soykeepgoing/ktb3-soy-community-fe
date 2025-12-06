import { h } from "../../../core/vdom/h.js";

export function LoginField({label, type, placeholder, value, onInput, onBlur}){
    return h("div", { className: "login_field"},
        h("label", null, label),
        h("input",{
            type, 
            id: `${label}-input`,
            placeholder,
            value,
            onInput,
            onBlur
        })
    );
}