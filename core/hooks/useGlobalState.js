import { getState, setState, subscribe } from "../GlobalStore.js";
import { useEffect } from "./useEffect.js";
import { useState } from "./useState.js";

// 값이면 값 그대로를 갖고, 함수라면 함수 실행으로 값을 얻는다. 
const resolveValue = (valueOrFn) => 
    typeof valueOrFn === "function" ? valueOrFn() : valueOrFn;

export function useGlobalState(key, initialValue){
    // 전역 상태의 초기값 설정 
    const existing = getState(key);
    const initial = existing !== undefined
        ? existing
        : resolveValue(initialValue);

    
    // 전역 상태 초기화
    if (existing === undefined && initialValue !== undefined){
        setState(key, initial);
    }

    // 리렌더링을 할 수 있게 캐시처럼 열어둔다. 
    const [state, setLocalState] = useState(initial);

    // Key에 대한 전역 상태 구독 
    useEffect(() => {
        const unsubscribe = subscribe(key, setLocalState);
        return () => unsubscribe && unsubscribe();
    }, [key]);


    const setGlobalState = (next) => {
        const resolved = typeof next === "function" ? next(getState(key)): next;
        setState(key, resolved);
    }; 

    return [state, setGlobalState];
}