import { h } from "../../core/vdom/h.js";
import { LoginForm } from "../../components/Login/LoginForm/LoginForm.js";
import { LinkTo } from "../../components/LinkTo/LinkTo.js";
import { router } from "../../main.js";

export function LoginPage() {
    return h("div", {className: "login-page"}, 
        h("div", {className: "container"},
        LoginForm(), 
        LinkTo({
            text: "Join Us!", 
            onClick: () => { router.navigate("/signup"); }
        })
    ));
}
