import { globalFiberState } from "./fiber/globalFiberState.js";

export class Router{
    constructor(){
        this.routes = [];
        this.container = document.getElementById("root");
        this.currentPath = window.location.pathname;
        this.params = {};
        this._onChanged = null; 
        window.addEventListener("popstate", this._handlePopState.bind(this));
    }

    add(param, page){
        this.routes.push({ path: param, page });
        return this;
    }

    start(callback){
        this._onChanged = callback;
        this._render();
    }

    navigate(path){
        if (this.currentPath === path) return;

        window.history.pushState(null, "", path);
        this.currentPath = path;
        this._render();
    }

    _render(){
        const path = window.location.pathname;
        const match = this._matchRoute(path);
        const page = match?.page || this.routes.find(r => r.path === "*")?.page;
        this.params = match?.params || {}; 
        
        if(this._onChanged && page){
            this._onChanged(page, this.params);
        }
    }

    _handlePopState(){
        this.currentPath = window.location.pathname;
        this._render();
    }

    _matchRoute(path){
        // 1. 정적 라우트 
        for (const route of this.routes){
            if (!route.path.includes("{") && route.path === path){
                return {page: route.page, params: {}};
            }
        }
        // 2. 동적 라우트
        for (const route of this.routes){
            if (!route.path.includes("{")) continue;

            const paramNames = []; 
            const regexPath = route.path.replace(/{([^}]+)}/g, (_, name) => {
                paramNames.push(name);
                return "([^/]+)";
            });

            const regex = new RegExp(`^${regexPath}$`);
            const match = path.match(regex);
            if (!match) continue;

            const params = {};
            paramNames.forEach((name, idx) => {
                params[name] = match[idx + 1];
            });
            return { page: route.page, params};
        }

        return null;
    }
}
