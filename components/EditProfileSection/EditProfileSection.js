import { h } from "../../core/vdom/h.js";

import { EditProfileForm } from "./EditProfileForm/EditProfileForm.js";
import { LinkTo } from "../LinkTo/LinkTo.js";
import { Modal } from "../Modal/Modal.js";

import { useState } from "../../core/hooks/useState.js";
import { useInputField } from "../../core/hooks/useInputField.js";

import { validateNickname } from "../../utils/validation/validateNickname.js";
import { handleImageChanged } from "../../handlers/handleImageChanged.js";
import { handleDelete } from "../../handlers/users/handleDelete.js";
 
export function EditProfileSection(){

    const nickname = useInputField("", validateNickname);
    const [imgPreviewUrl, setImgPreviewUrl] = useState(
        "../../../images/default_user_profile.png");
    const [profileImgFile, setProfileImgFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            onImgChange: handleProfileImgChange, 
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
        })] : [])
    );
}
