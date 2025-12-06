import {globalFiberState} from "../fiber/globalFiberState.js"
import { shallowEqual } from "./shallowEqual.js"

export function useEffect(callback, dep) {
    const hookIndex = globalFiberState.wipFiber.hookIndex;  
    const oldHook = globalFiberState.wipFiber.alternate?.hooks[hookIndex];
    const hasChanged = !oldHook || !shallowEqual(oldHook.dep, dep)

    const newHook = {
        dep, 
        callback, 
        cleanup: oldHook?.cleanup ?? null
    }

    globalFiberState.wipFiber.hooks.push(newHook)

    if (hasChanged){
        globalFiberState.globalEffects.push(newHook)
    }

    globalFiberState.wipFiber.hookIndex++
}