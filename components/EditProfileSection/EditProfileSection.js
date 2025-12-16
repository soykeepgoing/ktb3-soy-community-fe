import { h } from "../../core/vdom/h.js";

import { EditProfileForm } from "./EditProfileForm/EditProfileForm.js";
import { LinkTo } from "../LinkTo/LinkTo.js";
import { Modal } from "../Modal/Modal.js";
import { Toast } from "../Toast/Toast.js";
import { useState } from "../../core/hooks/useState.js";
import { useInputField } from "../../core/hooks/useInputField.js";

import { validateNickname } from "../../utils/validation/validateNickname.js";
import { handleImageChanged } from "../../handlers/handleImageChanged.js";
import { handleDelete } from "../../handlers/users/handleDelete.js";
import { handleEditProfile } from "../../handlers/users/handleEditProfile.js";

import { getState } from "../../core/GlobalStore.js";

export function EditProfileSection(){

    const nickname = useInputField("", validateNickname);
    const [imgPreviewUrl, setImgPreviewUrl] = useState(getState("userProfileImg"));
    const [profileImgFile, setProfileImgFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isToastOn, setIsToastOn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await handleEditProfile({
            nickname: nickname.value, 
            profileImgFile: profileImgFile
        });
        
        if (res.success){
            setIsToastOn(true);
        }
    };

    const handleSignOutClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmSignOut = () => {
        setIsModalOpen(false);
        handleDelete(); 
    };

    const handleCancelSignOut = () => {
        setIsModalOpen(false);
    };

    return h(
        "section", 
        {className: "edit-profile-section"}, 
        h("h2", {}, "회원 정보 수정"),
        EditProfileForm({
            nickname, 
            imgPreviewUrl, 
            onImgChange: async (e) => {
                const {imageUrl, file} = await handleImageChanged(e);
                setImgPreviewUrl(imageUrl);
                setProfileImgFile(file);
            }, 
            onSubmit: handleSubmit
        }), 
        LinkTo({
            text: "Sign Out", 
            onClick: handleSignOutClick
        }), 
        ...(isModalOpen ? [Modal({
            titleMsg: "회원 탈퇴 하시겠습니까?", 
            contentMsg: "작성된 게시글과 댓글은 삭제됩니다.",
            onClickConfirm: handleConfirmSignOut,
            onClickCancel: handleCancelSignOut
        })] : []), 
       ...(isToastOn
        ? [Toast({isToastOn, setIsToastOn, text: "프로필 정보 수정 성공"})]
        : [])
    );
}
