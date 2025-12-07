import { h } from "../../../core/vdom/h.js";

import { validateEmail } from "../../../utils/validation/validateEmail.js";
import { validatePw } from "../../../utils/validation/validatePw.js";
import { validatePwCheck } from "../../../utils/validation/validatePwCheck.js";
import { validateNickname } from "../../../utils/validation/validateNickname.js";

import { Button } from "../../Button/Button.js";
import { SignupField } from "../SignupField/SignupField.js";
import { useInputField } from "../../../core/hooks/useInputField.js";

export function SignupForm(){

    const email = useInputField("", validateEmail);
    const pw = useInputField("", validatePw);
    const pwCheck = useInputField("", (v) => validatePwCheck(pw.value, v));
    const nickname = useInputField("", validateNickname);

    return h("form",
        { className: "signup-form"}, 
        SignupField({
            label: "Email*",
            type: "email",
            id: "signup-email-input",
            placeholder: "이메일을 입력하세요.",
            value: email.value,
            helperText: email.helperText,
            onInput: (e) => email.setValue(e.target.value),
            onBlur: () => email.setTouched(true)
        }),

        SignupField({
            label: "Password*",
            type: "password",
            id: "signup-password-input",
            placeholder: "비밀번호를 입력하세요.",
            value: pw.value,
            helperText: pw.helperText,
            onInput: (e) => pw.setValue(e.target.value),
            onBlur: () => pw.setTouched(true)
        }),
        SignupField({
            label: "Password check*",
            type: "password",
            id: "signup-password-check-input",
            placeholder: "비밀번호를 한 번 더 입력하세요.", 
            value: pwCheck.value,
            helperText: pwCheck.helperText, 
            onInput: (e) => pwCheck.setValue(e.target.value),
            onBlur: () => pwCheck.setTouched(true)
        }),
        SignupField({
            label: "Nickname*",
            type: "nickname",
            id: "signup-nickname-input",
            placeholder: "닉네임을 입력하세요.",
            value: nickname.value, 
            helperText: nickname.helperText, 
            onInput: (e) => nickname.setValue(e.target.value), 
            onBlur: () => nickname.setTouched(true)
        }),
        Button({
            className: "button",
            id: "signup_btn",
            text: "Sign Up"
        })
    )
}