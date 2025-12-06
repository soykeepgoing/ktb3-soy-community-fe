import { globalFiberState } from "../fiber/globalFiberState.js"

export function useState(initial){
    const oldHook = 
        globalFiberState.wipFiber.alternate &&
        globalFiberState.wipFiber.alternate.hooks &&
        globalFiberState.wipFiber.alternate.hooks[globalFiberState.wipFiber.hookIndex];

    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    };

    const actions = oldHook ? oldHook.queue : [];
    actions.forEach(action => {
        if (typeof action === 'function') {
            hook.state = action(hook.state);
        } else {
            hook.state = action;
        }
    })

    const setState = (action) => {
        console.log(action);
        hook.queue.push(action);
        globalFiberState.wipRoot = {
            dom: globalFiberState.currentRoot.dom, 
            props: globalFiberState.currentRoot.props, 
            alternate: globalFiberState.currentRoot
        }
        globalFiberState.nextUnitOfWork = globalFiberState.wipRoot;
        globalFiberState.deletions = [];
    };

    globalFiberState.wipFiber.hooks.push(hook);
    globalFiberState.wipFiber.hookIndex++;

    return [hook.state, setState];
}