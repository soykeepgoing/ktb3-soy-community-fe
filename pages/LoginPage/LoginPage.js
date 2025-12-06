import { h } from "../../core/vdom/h.js";
import { LoginForm } from "../../components/Login/LoginForm/LoginForm.js";

export function LoginPage() {
    return h("div", {className: "login_page"}, 
        h("div", {className: "container"},
        LoginForm()
    ));
}
