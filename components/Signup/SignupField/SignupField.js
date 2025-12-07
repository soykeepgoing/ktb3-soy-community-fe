import { h } from "../../../core/vdom/h.js";
import { HelperText } from "../../HelperText/HelperText.js";

export function SignupField({label, type, id, placeholder, value, helperText, onInput, onBlur}){
    return h("div", { className: "signup-field"},
        h("label", null, label),
        h("input",{
            type, 
            id,
            placeholder,
            value,
            onInput,
            onBlur
        }), 
        HelperText({
            id: `signup-helper-${type}`,
            text: helperText
        })
    );
}