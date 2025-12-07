import { h } from "../../../core/vdom/h.js";
import { AvatarUploader } from "../../AvatarUploader/AvatarUploader.js";

export function SignupImgField({id, label, src}){
    return h("div", { className: "signup-field"},
        h("label", null, label),
        AvatarUploader({id, src}),
    );
}