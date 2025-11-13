import { SignUpLink } from "../components/SignUpLink.js";
import { Login } from "../components/users/Login.js";
import {attachLoginValid } from "../handle/users/handleLoginValid.js";
import { attachLoginSubmit } from "../handle/users/handleLoginSubmit.js";

export function LoginPage(){
    const login = Login();
    attachLoginValid(login);
    
    const signUpLink = SignUpLink();

    const div = document.createElement("div");
    div.appendChild(login);
    div.appendChild(signUpLink);

    return div;
}
