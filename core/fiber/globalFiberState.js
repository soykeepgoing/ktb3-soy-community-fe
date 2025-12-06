export const globalFiberState = {
    wipRoot: null,
    currentRoot: null, 
    wipFiber: null, 
    nextUnitOfWork: null, 
    deletions: [],  
    globalEffects: [],

    hasPendingUpdate: false // 렌더 또는 이벤트 도중에 호출되면 true
}