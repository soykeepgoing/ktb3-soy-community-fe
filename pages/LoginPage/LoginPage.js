import { h } from "../../core/vdom/h.js";
import { createElement } from "../../core/vdom/createElement.js";
import { Login } from "../../components/Users/Login.js";
import { SignUpLink } from "../../components/Users/SignUpLink.js";

export function LoginPage() {
  const login = Login();
  const signUpLink = SignUpLink();

  return h("div", {class: "login__container"},
    h("div", {class: "login__title"}, "Dancing Tomato Club")
  );
}
