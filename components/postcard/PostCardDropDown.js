import { navigateTo } from "../../core/router.js"
import { handlePostDelete } from "../../handle/posts/PostEventHandler.js";
import { Dropdown } from "../Dropdown/Dropdown.js"

export function PostCardDropDown(postId){
    return Dropdown(
        {
            placeholder:  "⋯",
            options: [
                {value: "edit", label: "수정"},
                {value: "delete", label: "삭제"}
            ], 
            className: "postCardDropDown",
            clickEvents: {
                edit: () => navigateTo(`/posts/${postId}/edit`),
                delete: () => handlePostDelete(postId)
            }
        }
    
        
    );
}