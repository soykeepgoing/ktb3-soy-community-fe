import { h } from "../../core/vdom/h.js";

export function AvatarUploader({id, src, onChange}){
    return h(
        "div", 
        {className: "avatar-uploader-widget"}, 
        h(
            "div", 
            {className: "avatar-uploader-widget__wrapper"}, 
            h(
                "label", 
                {className: "avatar-uploader-widget__thumbnail", for: id},
                h("img", 
                    {
                        className: "img-tag", 
                        alt:"Profile Image", 
                        src
                    }),
                h(
                    "input", 
                    {
                        id,
                        className: "avatar-uploader-widget__file-trigger", 
                        type: "file",
                        accept: "image/*", 
                        onChange
                    }
                )
            ),

        )
    )
}