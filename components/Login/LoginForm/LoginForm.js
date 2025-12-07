import {h} from "../../../core/vdom/h.js";
import { LoginTitle } from "../LoginTitle/LoginTitle.js";
import { LoginField } from "../LoginField/LoginField.js";
import { LoginHelper } from "../LoginHelper/LoginHelper.js";
import { useState } from "../../../core/hooks/useState.js";
import { useEffect } from "../../../core/hooks/useEffect.js";
import { Button } from "../../Button/Button.js";
import { useInputField } from "../../../core/hooks/useInputField.js";
import { validateEmail } from "../../../utils/validation/validateEmail.js";
import { validatePw } from "../../../utils/validation/validatePw.js";

export function LoginForm() {

    const email = useInputField("", validateEmail);
    const pw = useInputField("", validatePw);

    return h("section", null, 
        LoginTitle(), 
        
        LoginField({
            label: "Email*", 
            type: "email", 
            id: "signin-login-input",
            placeholder: "email", 
            value: email.value,
            onInput: e => email.setValue(e.target.value),
            onBlur: () => email.setTouched(true)
        }),

        LoginField({
            label: "Password*", 
            type: "password", 
            id: "signin-pw-input", 
            placeholder: "password",
            value: pw.value,
            onInput: (e) => pw.setValue(e.target.value),
            onBlur: () => pw.setTouched(true)
        }),

        LoginHelper({
            text: (email.isTouched && email.helperText)
                ? email.helperText
                : (pw.isTouched && pw.helperText)
                ? pw.helperText
                : "",
                invalid: !email.isValid || !pw.isValid
        }),

        Button({
            id: "login_button",
            text: "Sign in",
            disabled: !(email.isValid && pw.isValid), 
            onClick: () => console.log("로그인")
        })
    )
}