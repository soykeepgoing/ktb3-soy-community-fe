import { h } from "../../../core/vdom/h.js";

export function CommentForm({
    mode, 
    value, 
    onChange, 
    onSubmit, 
    onCancel
}){
    const isEdit = mode === "edit";

    return h(
        "form", 
        { className: "comment-form", onSubmit}, 
        h("textarea", {
            value, 
            placeholder: "댓글을 남겨주세요.",
            onInput: (e) => onChange(e.target.value),
        }),
        h("div", 
            {className: "comment-form-actions"}, 
            h("button", {type: "submit", disabled: !value.trim()}, isEdit ? "수정" : "등록"),
            isEdit ? h("button", { type: "button", onClick: onCancel}, "취소") : null 
        )
    )
}