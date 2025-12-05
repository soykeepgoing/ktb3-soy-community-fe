import { globalFiberState } from "./globalFiberState.js";
import { reconcileFunctionComponent, reconcileHostComponent } from "../render/reconcile.js";
import { commitRoot } from "../commit/commit.js";

export function workLoop(deadline) {
    let shouldYield = false;
    while (globalFiberState.nextUnitOfWork && !shouldYield) {
        globalFiberState.nextUnitOfWork = 
            performUnitOfWork(globalFiberState.nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }
    
    if (!globalFiberState.nextUnitOfWork && globalFiberState.wipRoot) {
        commitRoot()
    }

    requestIdleCallback(workLoop)
}

function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function

    if (isFunctionComponent){
        reconcileFunctionComponent(fiber)
    } else {
        reconcileHostComponent(fiber)
    }

    if (fiber.child) {return fiber.child}
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {return nextFiber.sibling}
        nextFiber = nextFiber.parent
    }
}