import { EditProfile } from "../components/users/EditProfile.js";
import { attachUserEditProfile } from "../handle/users/handleEditUserProfile.js";

export function EditProfilePage(){
    const div = document.createElement("div");
    const section = EditProfile();
    attachUserEditProfile(section);
    div.appendChild(section);
    return div;
}