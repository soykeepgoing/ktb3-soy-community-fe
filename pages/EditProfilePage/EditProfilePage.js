import { EditProfileSection } from "../../components/EditProfileSection/EditProfileSection.js";
import { h } from "../../core/vdom/h.js";

export function EditProfilePage(){

    const section = EditProfileSection();

    return h("div", {}, section);

}