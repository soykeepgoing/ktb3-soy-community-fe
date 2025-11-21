import { Header } from "../components/Header.js";
import { navigateTo } from "../core/router.js";

export function renderHeader() {
    const existingHeader = document.querySelector("header");
    if (existingHeader) existingHeader.remove();

    const newHeader = Header();
    document.body.prepend(newHeader);
}


export function setNewDropDown(){
    const header = document.getElementById("header");
    const userProfile = document.querySelector("#user-profile");
    const userProfileImage = document.querySelector("#profile-img");

    userProfile.style.display = 'inline-block';
    userProfileImage.src = localStorage.getItem("userProfileImg");

    const editUserProfile = document.querySelector("#edit-user-profile");
    editUserProfile.addEventListener("click", () => navigateTo("/edit-profile"));

    const editUserPassword = document.querySelector("#edit-user-password");
    editUserPassword.addEventListener("click", () => navigateTo("/edit-password"));

    const logoutUser = header.querySelector("#logout-user");
    logoutUser.addEventListener("click", () => {
        localStorage.clear();
        localStorage.setItem("isLogin", "false");
        navigateTo("/");
    });

}