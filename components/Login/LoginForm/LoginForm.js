import { router } from "../../../main.js";
import {h} from "../../../core/vdom/h.js";
import { useInputField } from "../../../core/hooks/useInputField.js";
import { useState } from "../../../core/hooks/useState.js";

import { LoginTitle } from "../LoginTitle/LoginTitle.js";
import { LoginField } from "../LoginField/LoginField.js";
import { LoginHelper } from "../LoginHelper/LoginHelper.js";
import { Button } from "../../Button/Button.js";

import { handleLogin } from "../../../handlers/auth/handleLogin.js";
import { validateEmail } from "../../../utils/validation/validateEmail.js";
import { validatePw } from "../../../utils/validation/validatePw.js";

export function LoginForm() {

    const email = useInputField("", validateEmail);
    const pw = useInputField("", validatePw);
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);

    return h("section", null, 
        LoginTitle(), 
        
        LoginField({
            label: "Email*", 
            type: "email", 
            id: "signin-login-input",
            placeholder: "email", 
            value: email.value,
            onInput: e => email.handleInput(e.target.value),
            onBlur: () => email.handleBlur()
        }),

        LoginField({
            label: "Password*", 
            type: "password", 
            id: "signin-pw-input", 
            placeholder: "password",
            value: pw.value,
            onInput: e => pw.handleInput(e.target.value),
            onBlur: () => pw.handleBlur()
        }),

        LoginHelper({
            text: 
                loginErrMsg ? loginErrMsg:
                (email.isTouched && email.helperText) ? email.helperText :
                (pw.isTouched && pw.helperText) ? pw.helperText :
                "",
                invalid: !email.isValid || !pw.isValid || !isLoginSuccess
        }),

        Button({ 
            id: "login_button",
            text: "Sign in",
            disabled: !(email.isValid && pw.isValid), 
            onClick: async () => {
                const res = await handleLogin({
                    email: email.value, 
                    password: pw.value
                });
                if (!res.success) {
                    setLoginErrMsg("이메일과 비밀번호를 다시 확인해주세요.");
                    setIsLoginSuccess(false);
                    return;
                }
                setIsLoginSuccess(true);
                router.navigate("/posts");
            }
        })
    )
}