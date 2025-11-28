class GlobalStore {

    constructor(){this.store = {}}

    setState(key, value){
        this.store[key] = value;
    }
    
    getState(key){
        return this.store[key];
    }

    clearStore(){
        this.store = {};
    }
}

const globalStore = new GlobalStore();
export const setState = globalStore.setState.bind(globalStore);
export const getState = globalStore.getState.bind(globalStore);
export const clearStore = globalStore.clearStore.bind(globalStore);