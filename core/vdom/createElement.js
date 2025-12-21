import { createTextElement } from "../vdom/createTextElement.js"

export function createElement(type, props, ...children) {
  return {
    type: type,
    props: {
      ...props,
      children: children
      .flat()
      .filter(child => child !== null && child !== false)
      .map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    }
  }
}