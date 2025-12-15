import { h } from "../../../core/vdom/h.js";
import { FormField } from "../../FormField/FormField.js";
import { Button } from "../../Button/Button.js";

export function EditPasswordForm({
    oldPassword,
    newPassword,
    newPasswordCheck, 
    onSubmit
}){
    return h(
        "form", 
        {}, 
        FormField({
            label: "기존 비밀번호*", 
            type: "password", 
            id: "oldPassword", 
            placeholder: "기존 비밀번호를 입력하세요.",
            value: oldPassword.value,
            helperText: oldPassword.helperText,
            onInput: (e) => oldPassword.handleInput(e.target.value),
            onBlur: () => oldPassword.handleBlur()
        }),
        FormField({
            label: "새 비밀번호*", 
            type: "password", 
            id: "newPassword", 
            placeholder: "새 비밀번호를 입력하세요.",
            value: newPassword.value,
            helperText: newPassword.helperText,
            onInput: (e) => newPassword.handleInput(e.target.value),
            onBlur: () => newPassword.handleBlur()
        }),
        FormField({
            label: "새 비밀번호 확인*", 
            type: "password", 
            id: "newPasswordCheck", 
            placeholder: "새 비밀번호를 한번 더 입력하세요.",
            value: newPasswordCheck.value,
            helperText: newPasswordCheck.helperText,
            onInput: (e) => newPasswordCheck.handleInput(e.target.value),
            onBlur: () => newPasswordCheck.handleBlur()
        }),
        Button({
            className: "button",
            id: "editPassword_btn",
            text: "Change Password", 
            disabled: !(oldPassword.isValid && newPassword.isValid && newPasswordCheck.isValid),
            onClick: onSubmit
        })
    )
}
