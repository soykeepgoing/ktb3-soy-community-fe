import { h } from "../../../core/vdom/h.js";
import { useState } from "../../../core/hooks/useState.js";
import { useInputField } from "../../../core/hooks/useInputField.js";

import { validateNickname } from "../../../utils/validation/validateNickname.js";

import { Button } from "../../Button/Button.js";
import { FormField } from "../../FormField/FormField.js";
import { EmailInfo } from "../EmailInfo/EmailInfo.js";
import { ProfileImgField } from "../../ProfileImgField/ProfileImgField.js";

import { handleImageChanged } from "../../../handlers/handleImageChanged.js";
import { handleSignUp } from "../../../handlers/users/handleSignup.js";

export function EditProfileForm({
    nickname, 
    imgPreviewUrl, 
    onImgChange, 
    onSubmit
}){
    return h(
        "form",
        { className: "edit-profile-form"}, 
        ProfileImgField({
            id: "signup-img-input", 
            label: "Profile Image",
            src: imgPreviewUrl,
            onChange: onImgChange
        }),
        EmailInfo(), 
        FormField({
            label: "Nickname*",
            type: "nickname",
            id: "edit-profile-nickname-input",
            placeholder: "닉네임을 입력하세요.",
            value: nickname.value,
            helperText: nickname.helperText,
            onInput: (e) => nickname.handleInput(e.target.value),
            onBlur: () => nickname.handleBlur()
        }),
        Button({
            className: "button",
            id: "editProfile_btn",
            text: "Change Profile", 
            disabled: !nickname.isValid,
            onClick: onSubmit
        })
    )
}