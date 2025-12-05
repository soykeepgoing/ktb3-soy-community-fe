import { createTextElement } from "../vdom/createTextElement.js"

export function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
     children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    }
  }
}