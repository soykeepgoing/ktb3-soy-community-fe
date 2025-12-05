import {updateDom} from "../commit/updateDom.js";

export function createDom(fiber) {
    const dom =
        fiber.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(fiber.type);

    updateDom(dom, {}, fiber.props);

    return dom;
}