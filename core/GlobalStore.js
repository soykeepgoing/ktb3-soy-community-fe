class GlobalStore {

    constructor(){
        this.store = {}; 
        this.listeners = new Map();
    }

    setState(key, value){
        this.store[key] = value; 
        const subs = this.listeners.get(key);
        if (subs){
            // key를 구독하고 있는 콜백을 모두 호출 
            subs.forEach((listener) => listener(value));
        }
    }

    getState(key){
        return this.store[key];
    }

    subscribe(key, listener){
        if (!this.listeners.has(key)){
            this.listeners.set(key, new Set());
        }

        const subs = this.listeners.get(key);
        subs.add(listener);

        return () => {
            subs.delete(listener);
            if (subs.size === 0) {
                this.listeners.delete(key);
            }
        };
    }

    clearStore(){
        this.store = {};
        this.listeners.clear();
    }
}

const globalStore = new GlobalStore();
export const setState = globalStore.setState.bind(globalStore);
export const getState = globalStore.getState.bind(globalStore);
export const subscribe = globalStore.subscribe.bind(globalStore);
export const clearStore = globalStore.clearStore.bind(globalStore);