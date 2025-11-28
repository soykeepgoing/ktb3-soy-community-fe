import { EditProfile } from "../components/Users/EditProfile.js";
import { attachUserEditProfile } from "../handle/users/UserEventHandler.js";
import { FloatingButton } from "../components/FloatingButton/FloatingButton.js";

export function EditProfilePage(){
    const div = document.createElement("div");
    div.classList.add("editProfilePage");
    const section = EditProfile();
    attachUserEditProfile(section);
    div.appendChild(section);

    const floatingBtn = FloatingButton({value: "🏠", url: "/posts"});
    div.appendChild(floatingBtn);

    return div;
}