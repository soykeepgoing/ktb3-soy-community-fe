import { h } from "../../core/vdom/h.js"
import { SignupTitle } from "../../components/Signup/SignupTitle/SignupTitle.js"
import { SignupForm } from "../../components/Signup/SignupForm/SignupForm.js";

export function SignUpPage(){
    return h("section", null, 
        SignupTitle(), 
        SignupForm(),
    );
}