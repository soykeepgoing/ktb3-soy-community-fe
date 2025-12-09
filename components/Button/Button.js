import {h} from "../../core/vdom/h.js";

export function Button({ id, text, disabled, onClick }) {
  return h(
    "button",
    {
      className: "button",
      id,
      disabled,
      onClick   
    },
    text
  );
}
