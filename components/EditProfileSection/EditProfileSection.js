import { h } from "../../core/vdom/h.js";

import { EditProfileForm } from "./EditProfileForm/EditProfileForm.js";
import { LinkTo } from "../LinkTo/LinkTo.js";

import { useState } from "../../core/hooks/useState.js";
import { useInputField } from "../../core/hooks/useInputField.js";

import { validateNickname } from "../../utils/validation/validateNickname.js";
import { handleImageChanged } from "../../handlers/handleImageChanged.js";

export function EditProfileSection(){

    const nickname = useInputField("", validateNickname);
    const [imgPreviewUrl, setImgPreviewUrl] = useState(
        "../../../images/default_user_profile.png");
    const [profileImgFile, setProfileImgFile] = useState(null);

    const handleProfileImgChange = async(e) => {
        const {imgUrl, file} = await handleImageChanged(e);
        setImgPreviewUrl(imgUrl);
        setProfileImgFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleEditProfile({
            nickname: nickname.value, 
            profileImgFile: profileImgFile
        });
    };

    return h(
        "section", 
        {}, 
        h("h2", {}, "회원 정보 수정"),
        EditProfileForm({
            nickname, 
            imgPreviewUrl, 
            onImgChange: handleProfileImgChange, 
            onSubmit: handleSubmit
        }), 
        LinkTo({
            text: "Sign Out", 
            onClick: () => console.log("Sign Out")
        })
    );
}