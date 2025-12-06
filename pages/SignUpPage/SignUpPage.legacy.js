import { SignUp } from "../../components/Users/SignUp.js";
import { attachSignUpEvents } from "../../handle/users/UserEventHandler.js";

export function SignUpPage(){
    const signUp = SignUp();
    attachSignUpEvents(signUp);

    const signUpContainer = document.createElement("div");
    signUpContainer.classList.add("signup__container");
    signUpContainer.appendChild(signUp);

    const signUpPage = document.createElement("div");
    signUpPage.classList.add("page-center");
    signUpPage.appendChild(signUpContainer);

    return signUpPage;
}