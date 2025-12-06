import { commitDeletion } from "../commit/commitDeletion.js";
import { globalFiberState } from "../fiber/globalFiberState.js"

export function render(element, container) {
    console.log(element, globalFiberState.currentRoot);

    globalFiberState.wipRoot = {
        dom: container,
        props: {children: [element]},
        alternate: globalFiberState.currentRoot
    };
    
    globalFiberState.deletions = []
    globalFiberState.nextUnitOfWork = globalFiberState.wipRoot
}