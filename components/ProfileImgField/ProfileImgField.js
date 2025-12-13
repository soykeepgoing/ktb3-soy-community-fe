import { h } from "../../../core/vdom/h.js";
import { AvatarUploader } from "../AvatarUploader/AvatarUploader.js";

export function ProfileImgField({id, label, src, onChange}){
    return h("div", { className: "profile-img-field"},
        h("label", null, label),
        AvatarUploader({id, src, onChange}),
    );
}