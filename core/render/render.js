import { commitDeletion } from "../commit/commitDeletion.js";
import { globalFiberState } from "../fiber/globalFiberState.js"

export function render(element, container) {
    globalFiberState.wipRoot = {
        dom: container,
        props: {children: [element]},
        alternate: globalFiberState.currentRoot
    };
    
    globalFiberState.deletions = []
    globalFiberState.nextUnitOfWork = globalFiberState.wipRoot
}