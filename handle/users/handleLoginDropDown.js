import { navigateTo } from "../../router/router.js";

export function setNewDropDown(){
    const header = document.getElementById("header");
    const userProfile = document.querySelector("#user-profile");
    const userProfileImage = document.querySelector("#profile-img");

    userProfile.style.display = 'inline-block';
    userProfileImage.src = localStorage.getItem("userProfileImg");

    const editUserProfile = document.querySelector("#edit-user-profile");
    console.log(editUserProfile);
    editUserProfile.addEventListener("click", () => navigateTo("/edit-profile"));

    const editUserPassword = document.querySelector("#edit-user-password");
    console.log(editUserProfile);
    editUserPassword.addEventListener("click", () => navigateTo("/edit-password"));


}