import { h } from "../../core/vdom/h.js";
import { router } from "../../core/router.js";;

export function FloatingButton({value, url}){
    return h("div", 
        {
            className: "floating-button", 
            onClick: () => router.navigate(url)
        }, 
        value
    )
}