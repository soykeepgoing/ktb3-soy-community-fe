import {h} from "../../../core/vdom/h.js";
import { LoginTitle } from "../LoginTitle/LoginTitle.js";
import { LoginField } from "../LoginField/LoginField.js";
import { LoginHelper } from "../LoginHelper/LoginHelper.js";
import { useState } from "../../../core/hooks/useState.js";
import { useEffect } from "../../../core/hooks/useEffect.js";
import { Button } from "../../Button/Button.js";

export function LoginForm() {

    const [email, setEmail] = useState("");
    const [isEmailTouched, setEmailTouched] = useState(false);
    const [isEmailValid, setEmailValid] = useState(false);

    const [pw, setPw] = useState("");
    const [isPwTouched, setPwTouched] = useState(false);
    const [isPwValid, setPwValid] = useState(false);

    const [helperText, setHelperText] = useState("");

    useEffect(() => {
        if (!isEmailTouched) return;

        if (email.trim() === "") {
            setHelperText("이메일을 입력하세요.");
            setEmailValid(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setHelperText("이메일 형식이 올바르지 않습니다.");
            setEmailValid(false);
            return;
        }

        setHelperText("");
        setEmailValid(true);

        return () => {console.log("clean up email")};
    }, [email, isEmailTouched]);

    useEffect(() => {
        if (!isPwTouched) return;

        if (pw.trim() === "") {
            setHelperText("비밀번호를 입력하세요.");
            setPwValid(false);
            return;
        }

        const pwReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
        if (!pwReg.test(pw)) {
            setHelperText("비밀번호는 8자 이상, 20자 이하이며 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.");
            setPwValid(false);
            return;
        }

        setHelperText("");
        setPwValid(true);

        return () => {console.log("clean up password")};

    }, [pw, isPwTouched]);


    return h("section", null, 
        LoginTitle(), 
        
        LoginField({
            label: "Email*", 
            type: "email", 
            placeholder: "email", 
            value: email,
            onInput: e => setEmail(e.target.value),
            onBlur: () => {setEmailTouched(true)}
        }),

        LoginField({
            label: "Password*", 
            type: "password", 
            id: "login__user-password", 
            placeholder: "password",
            value: pw,
            onInput: (e) => {setPw(e.target.value)},
            onBlur: () => {setPwTouched(true)}
        }),

        LoginHelper({
            text: helperText, 
            invalid: !isEmailValid || !isPwValid
        }),

        Button({
            id: "login_button",
            text: "Sign in",
            disabled: !(isEmailValid && isPwValid), 
            onClick: () => console.log("로그인")
        })
    )
}