import { globalFiberState } from "../fiber/globalFiberState.js"
import { updateDom } from "./updateDom.js";

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom)
  } else {
    commitDeletion(fiber.child, domParent)
  }
}

function commitWork(fiber) {
    if (!fiber) {
        return;
    }

    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;

    if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
        domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
        if(fiber.type === "TEXT_ELEMENT"){
            if (fiber.dom.nodeValue !== fiber.props.nodeValue) {
                fiber.dom.nodeValue = fiber.props.nodeValue;
            }
        } else {
            updateDom(fiber.dom, fiber.alternate.props, fiber.props);
        }
    } else if (fiber.effectTag === "DELETION") {
        commitDeletion(fiber, domParent);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

function flushEffects(){
    for (const hook of globalFiberState.globalEffects){
        if (globalFiberState.currentRoot && hook.cleanup){
            hook.cleanup()
        }

        const cleanup = hook.callback()
        hook.cleanup = typeof cleanup === "function" ? cleanup : null
    }
}

export function commitRoot() {
    globalFiberState.deletions.forEach(commitWork); 
    commitWork(globalFiberState.wipRoot.child);
    flushEffects();
    globalFiberState.currentRoot = globalFiberState.wipRoot;
    globalFiberState.wipRoot = null;
}