import { h } from "../../../core/vdom/h.js";
import { useState } from "../../../core/hooks/useState.js";

import { validateEmail } from "../../../utils/validation/validateEmail.js";
import { validatePw } from "../../../utils/validation/validatePw.js";
import { validatePwCheck } from "../../../utils/validation/validatePwCheck.js";
import { validateNickname } from "../../../utils/validation/validateNickname.js";

import { Button } from "../../Button/Button.js";
import { SignupField } from "../SignupField/SignupField.js";
import { useInputField } from "../../../core/hooks/useInputField.js";
import { SignupImgField } from "../SignupField/SignupImgField.js";

import { handleImageChanged } from "../../../handlers/handleImageChanged.js";
import { handleSignUp } from "../../../handlers/users/handleSignup.js";

export function SignupForm(){

    const email = useInputField("", validateEmail);
    const pw = useInputField("", validatePw);
    const pwCheck = useInputField("", (v) => validatePwCheck(pw.value, v));
    const nickname = useInputField("", validateNickname);

    const [imgPreviewUrl, setImgPreviewUrl] = useState("../../../images/default_user_profile.png");

    let profileImageUrl = null;
    let profileImageFile = null;

    return h("form",
        { className: "signup-form"}, 
        SignupImgField({
            id: "signup-img-input", 
            label: "Profile Image",
            src: imgPreviewUrl,
            onChange: async (e) => {
                const {imageUrl, file} = await handleImageChanged(e);
                profileImageUrl = imageUrl;
                profileImageFile = file;
                setImgPreviewUrl(imageUrl);
            }
        }),
        SignupField({
            label: "Email*",
            type: "email",
            id: "signup-email-input",
            placeholder: "이메일을 입력하세요.",
            value: email.value,
            helperText: email.helperText,
            onInput: (e) => email.handleInput(e.target.value),
            onBlur: () => email.handleBlur()
        }),
        SignupField({
            label: "Password*",
            type: "password",
            id: "signup-password-input",
            placeholder: "비밀번호를 입력하세요.",
            value: pw.value,
            helperText: pw.helperText,
            onInput: (e) => pw.handleInput(e.target.value),
            onBlur: () => pw.handleBlur()
        }),
        SignupField({
            label: "Password check*",
            type: "password",
            id: "signup-password-check-input",
            placeholder: "비밀번호를 한 번 더 입력하세요.", 
            value: pwCheck.value,
            helperText: pwCheck.helperText, 
            onInput: (e) => pwCheck.handleInput(e.target.value),
            onBlur: () => pwCheck.handleBlur()
        }),
        SignupField({
            label: "Nickname*",
            type: "nickname",
            id: "signup-nickname-input",
            placeholder: "닉네임을 입력하세요.",
            value: nickname.value, 
            helperText: nickname.helperText, 
            onInput: (e) => nickname.handleInput(e.target.value), 
            onBlur: () => nickname.handleBlur()
        }),
        Button({
            className: "button",
            id: "signup_btn",
            text: "Sign Up", 
            disabled: ! (email.isValid && pw.isValid && nickname.isValid),
            onClick: async (e) => {
                e.preventDefault();
                const res = await handleSignUp({
                    email: email.value, 
                    password: pw.value, 
                    nickname: nickname.value,
                    profileImage: profileImageFile
                });
            }
        })
    )
}