
import { editNickname, editProfileImage } from "../../api/userApi.js";
import { setState } from "../../core/GlobalStore.js";

export async function handleEditProfile({ nickname, profileImgFile }) {
    const hasNickname = typeof nickname === "string" && nickname.trim().length > 0;
    const hasProfileImg = !!profileImgFile;

    if (!hasNickname && !hasProfileImg) {
        return { success: false, message: "변경된 내용이 없습니다." };
    }

    const result = { success: false, nickname: null, profileImage: null };

    if (hasNickname) {
        const res = await editNickname({ userNickname: nickname });
        result.nickname = res;
        if (res?.success) {
            setState("userNickname", nickname);
        }
    }

    if (hasProfileImg) {
        const formData = new FormData();
        formData.append("file", profileImgFile);

        const res = await editProfileImage(formData);
        result.profileImage = res;
        if (res?.success) {
            const imgUrl = res.data?.userProfileImgUrl;
            if (imgUrl) setState("userProfileImg", imgUrl);
        }
    }

    result.success = Boolean(
        (result.nickname && result.nickname.success) ||
        (result.profileImage && result.profileImage.success)
    );

    return result;
}
