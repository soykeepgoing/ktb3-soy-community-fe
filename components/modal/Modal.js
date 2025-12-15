import { h } from "../../core/vdom/h.js";
import { Button } from "../Button/Button.js";

export function Modal({titleMsg, contentMsg, onClickConfirm, onClickCancel}){
    return h(
        "div",
        { className: "modal-wrapper" },
        h(
            "div",
            { className: "modal-box" },
            h("h2", { className: "modal-title" }, titleMsg),
            h("p", { className: "modal-content" }, contentMsg),
            h(
                "div",
                { className: "modal-buttons" },
                Button({
                    className: "btn-confirm",
                    id: "btn-confirm",
                    text: "확인",
                    disabled: false,
                    onClick: onClickConfirm
                }),
                Button({
                    className: "btn-cancel",
                    id: "btn-cancel",
                    text: "취소",
                    disabled: false,
                    onClick: onClickCancel
                })
            )
        )
    );
}
