import { SignUpLink } from "./SignUpLink.js";
import { Login } from "./Login.js";

export function LoginPage(){
    const login = Login();
    const signUpLink = SignUpLink();

    const div = document.createElement("div");
    div.appendChild(login);
    div.appendChild(signUpLink);

    return div;

}