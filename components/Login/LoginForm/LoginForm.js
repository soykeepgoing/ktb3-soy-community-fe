import {h} from "../../../core/vdom/h.js";
import { LoginTitle } from "../LoginTitle/LoginTitle.js";
import { LoginField } from "../LoginField/LoginField.js";
import { LoginHelper } from "../LoginHelper/LoginHelper.js";
import { LoginButton } from "../LoginButton/LoginButton.js";
import { useState } from "../../../core/hooks/useState.js";
import { useEffect } from "../../../core/hooks/useEffect.js";

export function LoginForm() {

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [helperText, setHelperText] = useState("");
    const [isValid, setValid] = useState(false);
    const [isTouched, setTouched] = useState(false);

    const handleBlur = () => {
        setTouched(true);
    }

    useEffect(() => {
        console.log(isTouched)
        if (!isTouched) return;

        if (email.trim() === "") {
            setHelperText("이메일을 입력하세요.");
            setValid(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setHelperText("이메일 형식이 올바르지 않습니다.");
            setValid(false);
            return;
        }

        setHelperText("");
        setValid(true);

    }, [email, isTouched]);



    return h("section", null, 
        LoginTitle(), 
        
        LoginField({
            label: "Email", 
            type: "email", 
            placeholder: "email", 
            value: email,
            onInput: e => setEmail(e.target.value),
            onBlur: handleBlur
        }),

        LoginField({
            label: "Password", 
            type: "password", 
            id: "login__user-password", 
            placeholder: "password",
            value: pw,
            onInput: (e) => {setPw(e.target.value)},
            onBlur: handleBlur
        }),

        LoginHelper(helperText),

        LoginButton({
            disabled: false, 
            onClick: () => console.log("로그인")
        })

    )
}