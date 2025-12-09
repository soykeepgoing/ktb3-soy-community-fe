import { h } from "../../core/vdom/h.js";

import { HelperText } from "../HelperText/HelperText.js";
import { Button } from "../Button/Button.js";

export function PostCreateSection(){
    return h("form", 
        {className: "post-create"}, 
        h("label", {}, "내용*"), 
        h("textarea", {placeholder: "내용을 입력해주세요."}), 
        HelperText({
            text: "", 
            invalid: true
        }), 
        h("label", {}, "이미지"), 
        h("input", {type: "file"}), 
        Button({
            text: "작성 완료",
            disabled: false, 
            onClick: () => console.log("hi")
        }), 
    )
}