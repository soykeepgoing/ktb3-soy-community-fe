import { h } from "../../../core/vdom/h.js";
import { HelperText } from "../HelperText/HelperText.js";

export function FormField({label, type, id, placeholder, value, helperText, onInput, onBlur}){
    return h("div", { className: "form-field"},
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
            id: `form-helper-${type}`,
            text: helperText
        })
    );
}