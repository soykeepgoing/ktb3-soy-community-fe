import { globalFiberState } from "../fiber/globalFiberState.js"

function scheduleUpdateOnRoot(){
    // 이미 렌더링 중인 루트가 있다면 패스 
    if (globalFiberState.wipRoot){
        return; 
    }

    if (globalFiberState.currentRoot){
        // 다음에 렌더 작업을 진행할 work와 root 선언 
        globalFiberState.wipRoot = {
            dom: globalFiberState.currentRoot.dom, 
            props: globalFiberState.currentRoot.props, 
            alternate: globalFiberState.currentRoot
        }
        globalFiberState.nextUnitOfWork = globalFiberState.wipRoot;
        globalFiberState.deletions = [];
    }
}


export function useState(initial){
    // 이전 state를 기억하기 위한 옛날 훅 
    const oldHook = 
        globalFiberState.wipFiber.alternate &&
        globalFiberState.wipFiber.alternate.hooks &&
        globalFiberState.wipFiber.alternate.hooks[globalFiberState.wipFiber.hookIndex];

    // 새 훅 만들기 
    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    };

    // 이전에 삽입된 액션들 수행
    const actions = oldHook ? oldHook.queue : [];
    actions.forEach(action => {
        if (typeof action === 'function') {
            hook.state = action(hook.state);
        } else {
            hook.state = action;
        }
    })

    // setState 함수 : 변경 감지 
    const setState = (action) => {
        hook.queue.push(action); // 클로저 

        // 예약 상태 업데이트
        globalFiberState.hasPendingUpdate = true;
        scheduleUpdateOnRoot();
    };

    // 다음 훅 순서 만들어주기 
    globalFiberState.wipFiber.hooks.push(hook);
    globalFiberState.wipFiber.hookIndex++;

    return [hook.state, setState];
}