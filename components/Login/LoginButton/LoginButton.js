import { Button } from "../../Button/Button.js";

export function LoginButton({ disabled, onClick }) {
  return Button({
    className: "login_btn",
    id: "login_btn",
    text: "Sign in",
    disabled,
    onClick
  });
}
