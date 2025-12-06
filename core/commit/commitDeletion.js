function runCleanupHooks(fiber){
    // console.log(fiber.hooks);
    if (!fiber.hooks) return;

    fiber.hooks.forEach(hook => {
        if (hook.cleanup){
            console.log(hook, hook.cleanup)
            hook.cleanup();
        }
    })
}

export function commitDeletion(fiber, domParent){
    if (!fiber) return;

    // 언마운트
    runCleanupHooks(fiber);

    if (fiber.dom){ // 실제 돔이 있는 경우
        domParent.removeChild(fiber.dom); // 돔 제거
    } else { // 돔이 없는 컴포넌트 
        let childNode = fiber.child;
        while(childNode){
            commitDeletion(fiber.child, domParent);
            childNode = childNode.sibling;
        }
    }

}