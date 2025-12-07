import { h } from "../../../core/vdom/h.js";
import { HelperText } from "../../HelperText/HelperText.js";

export function SignupHelper({id, text = "", invalid}){
    return HelperText({
        id, text, invalid
    });
}