import {h} from "../../core/vdom/h.js";

export function Button({ className, id, text, disabled, onClick }) {
  return h(
    "button",
    {
      className: className,
      id,
      disabled,
      onClick   
    },
    text
  );
}
