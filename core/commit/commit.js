import { globalFiberState } from "../fiber/globalFiberState.js"
import { updateDom } from "./updateDom.js";
import { commitDeletion } from "./commitDeletion.js";

function commitWork(fiber) {
    if (!fiber) {return;}

    // dom 찾기 
    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;

    if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
        domParent.appendChild(fiber.dom);
    } 
    else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
        if(fiber.type === "TEXT_ELEMENT"){
            if (fiber.dom.nodeValue !== fiber.props.nodeValue) {
                fiber.dom.nodeValue = fiber.props.nodeValue;
            }
        } else {
            updateDom(fiber.dom, fiber.alternate.props, fiber.props);
        }
    } else if (fiber.effectTag === "DELETION") {
        commitDeletion(fiber, domParent);
        return;
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

export function flushEffects() {
    // 대기중인 이펙트들에서 
    for (const effect of globalFiberState.globalEffects) {
        const { fiber, hook, oldCleanup } = effect;

        // 이전 클린업 함수 실행
        if (typeof oldCleanup === "function") {
            try {
                oldCleanup();
            } catch (e) {
                console.error("useEffect cleanup error:", e);
            }
        }

        // 새 클린업 함수 선언 
        let cleanup;
        try {
            cleanup = hook.callback();
        } catch (e) {
            console.error("useEffect callback error:", e);
            cleanup = null;
        }

        // 클린업 함수 훅에 저장 
        if (typeof cleanup === "function") {
            hook.cleanup = cleanup;
        } else {
            hook.cleanup = null;
        }
  }

  globalFiberState.globalEffects = [];
}

export function commitRoot() {
    globalFiberState.deletions.forEach(commitWork); 
    commitWork(globalFiberState.wipRoot.child);
    flushEffects();
    
    globalFiberState.currentRoot = globalFiberState.wipRoot;
    globalFiberState.wipRoot = null;

    // 도중에 발생했던 state가 있었다면 예약 
    if (globalFiberState.hasPendingUpdate && globalFiberState.currentRoot){
        globalFiberState.hasPendingUpdate = false;

        globalFiberState.wipRoot = {
            dom: globalFiberState.currentRoot.dom,
            props: globalFiberState.currentRoot.props,
            alternate: globalFiberState.currentRoot,
        };

        globalFiberState.nextUnitOfWork = globalFiberState.wipRoot;
        globalFiberState.deletions = [];
        
    }

}