import { globalFiberState } from "../fiber/globalFiberState.js";
import { scheduleUpdateOnRoot } from "../../core/fiber/scheduler.js";

export function useState(initial) {
    // 이전 훅 가져오기 
    const oldHook =
        globalFiberState.wipFiber.alternate &&
        globalFiberState.wipFiber.alternate.hooks &&
        globalFiberState.wipFiber.alternate.hooks[globalFiberState.wipFiber.hookIndex];

    // 큐 재사용 로직
    const hookQueue = oldHook ? oldHook.queue : []; 
    const actions = [... hookQueue];

    hookQueue.length = 0; // 큐 비우기 

    let newState = oldHook ? oldHook.state : initial; 
    actions.forEach(action => {
        newState = typeof action === "function"
            ? action(newState)
            : action;
    });

    const hook = {
        state: newState, 
        queue: hookQueue
    }; 

    const setState = (action) => {
        hookQueue.push(action);
        scheduleUpdateOnRoot(globalFiberState.wipFiber);
    }

    globalFiberState.wipFiber.hooks.push(hook);
    globalFiberState.wipFiber.hookIndex++;

    return [hook.state, setState];
}