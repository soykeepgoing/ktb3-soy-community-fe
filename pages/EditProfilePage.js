import { EditProfile } from "../components/EditProfile.js";

export function EditProfilePage(){
    const div = document.createElement("div");
    const section = EditProfile();
    div.appendChild(section);
    return div;
}