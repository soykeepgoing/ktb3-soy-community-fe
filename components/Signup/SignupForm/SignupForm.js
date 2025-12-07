import { useEffect } from "../../../core/hooks/useEffect.js";
import { useState } from "../../../core/hooks/useState.js";
import { h } from "../../../core/vdom/h.js";

import { validateEmail } from "../../../utils/validation/validateEmail.js";
import { validatePw } from "../../../utils/validation/validatePw.js";
import { validatePwCheck } from "../../../utils/validation/validatePwCheck.js";
import { validateNickname } from "../../../utils/validation/validateNickname.js";

import { Button } from "../../Button/Button.js";
import { SignupField } from "../SignupField/SignupField.js";

export function SignupForm(){
    const [email, setEmail] = useState("");
    const [helperEmailText, setHelperEmailText] = useState("");
    const [isEmailValid, setEmailValid] = useState(false);
    const [isEmailTouched, setEmailTouched] = useState(false);

    const [pw, setPw] = useState("");
    const [helperPwText, setHelperPwText] = useState("");
    const [isPwValid, setPwValid] = useState(false);
    const [isPwTouched, setPwTouched] = useState(false);

    const [pwCheck, setPwCheck] = useState("");
    const [helperPwCheckText, setHelperPwCheckText] = useState("");
    const [isPwCheckValid, setPwCheckValid] = useState(false);
    const [isPwCheckTouched, setPwCheckTouched] = useState(false);

    const [nickname, setNickname] = useState("");
    const [helperNicknameText, setHelperNicknameText] = useState("");
    const [isNicknameValid, setNicknameValid] = useState(false);
    const [isNicknameTouched, setNicknameTouched] = useState(false);

    useEffect(() => {
        if (!isEmailTouched) return;
        const {success, helperText} = validateEmail(email);
        setHelperEmailText(helperText);
        setEmailValid(success);
        return;
    }, [email, isEmailTouched]);

    useEffect(() => {
        if (!isPwTouched) return;
        const {success, helperText} = validatePw(pw);
        setHelperPwText(helperText);
        setPwValid(success);
        return;
    }, [pw, isPwTouched]);

    useEffect(() => {
        if (!isPwCheckTouched) return;
        const {success, helperText} = validatePwCheck(pw, pwCheck);
        setHelperPwCheckText(helperText);
        setPwCheckValid(success);
        return;
    }, [pwCheck, isPwCheckTouched])

    useEffect(() => {
        if (!isNicknameTouched) return;
        const {success, helperText} = validateNickname(nickname);
        setHelperNicknameText(helperText);
        setNicknameValid(success);
        return;
    }, [nickname, isNicknameTouched])


    return h("form", null, 
        SignupField({
            label: "Email*",
            type: "email",
            id: "signup-email-input",
            value: email,
            placeholder: "이메일을 입력하세요.",
            helperText: helperEmailText,
            onInput: (e) => setEmail(e.target.value),
            onBlur: () => {setEmailTouched(true)},
        }),
        SignupField({
            label: "Password*",
            type: "password",
            id: "signup-password-input",
            value: pw,
            placeholder: "비밀번호를 입력하세요.",
            helperText: helperPwText,
            onInput: (e) => setPw(e.target.value),
            onBlur: () => {setPwTouched(true)},
        }),
        SignupField({
            label: "Password check*",
            type: "password",
            id: "signup-password-check-input",
            value: pwCheck,
            placeholder: "비밀번호를 한 번 더 입력하세요.", 
            helperText: helperPwCheckText, 
            onInput: (e) => setPwCheck(e.target.value),
            onBlur: () => {setPwCheckTouched(true)}
        }),
        SignupField({
            label: "Nickname*",
            type: "nickname",
            id: "signup-nickname-input",
            value: nickname, 
            placeholder: "닉네임을 입력하세요.",
            helperText: helperNicknameText, 
            onInput: (e) => setNickname(e.target.value), 
            onBlur: () => { setNicknameTouched(true)}
        }),
        Button({
            className: "button",
            id: "signup_btn",
            text: "Sign Up"
        })
    )
}