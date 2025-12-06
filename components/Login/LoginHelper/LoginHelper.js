import { HelperText } from "../../HelperText/HelperText.js";

export function LoginHelper({text = "", invalid}){

    return HelperText({
        text, 
        invalid
    })
}