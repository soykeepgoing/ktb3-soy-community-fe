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
    // //console.log(fiber);
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
    
    // //console.log("perform 끝")
}

export function scheduleUpdateOnRoot(action){

    // 이미 렌더중이라면 지금 렌더를 방해하지말고 나중에 수행하도록 플래그만 세운다. 
    if (globalFiberState.wipRoot) { 
        // //console.log("네네", action);
        globalFiberState.hasPendingUpdate = true; 
        return;
    }

    // 아직 한 번도 렌더링된 적 없는 경우 방어 
    if (!globalFiberState.currentRoot){
        return; 
    }

    globalFiberState.wipRoot = {
        dom: globalFiberState.currentRoot.dom, 
        props: globalFiberState.currentRoot.props, 
        alternate: globalFiberState.currentRoot
    }
    
    globalFiberState.nextUnitOfWork = globalFiberState.wipRoot;
    globalFiberState.deletions = [];
    //console.log("🌀 스케줄링 들어갑니다. ")
    requestIdleCallback(workLoop);
}