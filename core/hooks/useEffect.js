import {globalFiberState} from "../fiber/globalFiberState.js"
import { shallowEqual } from "./shallowEqual.js";

export function useEffect(callback, dep) {
    // 현재 작업 중인 파이버와 훅 불러오기 
    const wipFiber = globalFiberState.wipFiber; 
    const hookIndex = wipFiber.hookIndex;

    // 이전 훅이 존재한다면 -> 얕은 비교 후 변경 여부 결정
    const oldHook = wipFiber.alternate?.hooks[hookIndex];
    const hasChanged = !oldHook || !shallowEqual(oldHook.dep, dep);

    // 새 훅 만들어서 넣기 
    const newHook = {
        dep,
        callback,
        cleanup: oldHook?.cleanup ?? null, // todo: 나중에 고치기
    };

    globalFiberState.wipFiber.hooks.push(newHook);
    globalFiberState.wipFiber.hookIndex++;

    // 변경이 감지되면 커밋 후 수행할 이펙트에 작업 넣기 
    if (hasChanged) {
        globalFiberState.globalEffects.push({
            fiber: wipFiber,
            hook: newHook,
            oldCleanup: oldHook?.cleanup ?? null,
        });
    }
}