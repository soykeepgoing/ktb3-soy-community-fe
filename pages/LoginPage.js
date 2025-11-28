import { SignUpLink } from "../components/Users/SignUpLink.js";
import { Login } from "../components/Users/Login.js";
import {attachLoginValid } from "../handle/users/UserValidationHandler.js";

export function LoginPage(){
    const login = Login();
    attachLoginValid(login);
    const signUpLink = SignUpLink();
    login.appendChild(signUpLink);

    const loginContainer = document.createElement("div");
    loginContainer.classList.add("login__container");
    loginContainer.appendChild(login);
    loginContainer.append(signUpLink);

    const loginPage = document.createElement("div");
    loginPage.classList.add("page-center");
    loginPage.appendChild(loginContainer);

    return loginPage;
}
