import {createDom} from "../commit/createDom.js";
import { globalFiberState } from "../fiber/globalFiberState.js";
import { diff } from "./diff.js";

export function reconcileFunctionComponent(fiber){
    // 새 파이버 만들어주기
    globalFiberState.wipFiber = fiber;
    globalFiberState.wipFiber.hooks = []; 
    globalFiberState.wipFiber.hookIndex = 0;

    const children = [fiber.type(fiber.props)]
    diff(fiber, children);
}

export function reconcileHostComponent(fiber){
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }

    diff(fiber, fiber.props.children);
}