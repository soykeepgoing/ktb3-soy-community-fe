import { h } from "../../core/vdom/h.js"
import { SignupTitle } from "../../components/Signup/SignupTitle/SignupTitle.js"
import { SignupForm } from "../../components/Signup/SignupForm/SignupForm.js";
import { LinkTo } from "../../components/LinkTo/LinkTo.js";
import { router } from "../../core/router.js";;

export function SignUpPage(){
    return h("div", {className: "signup-page"},
        h("div", 
            { className: "container"}, 
            SignupTitle(), 
            SignupForm(),
        LinkTo({
            text: "Sign In", 
            onClick: () => {router.navigate("/")}
        })
    ));
}