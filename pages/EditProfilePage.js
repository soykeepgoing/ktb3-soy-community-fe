import { EditProfile } from "../components/users/EditProfile.js";
import { attachUserEditProfile } from "../handle/users/UserEventHandler.js";

export function EditProfilePage(){
    const div = document.createElement("div");
    div.classList.add("editProfilePage");
    const section = EditProfile();
    attachUserEditProfile(section);
    div.appendChild(section);
    return div;
}