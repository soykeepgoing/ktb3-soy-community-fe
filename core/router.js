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
            this._onChanged(page);
        }
    }

    _handlePopState(){
        this.currentPath = window.location.pathname;
        this._render();
    }

    _matchRoute(path){
        for (const route of this.routes){
            // exact match first
            if (!route.path.includes("{") && route.path === path){
                return { page: route.page, params: {} };
            }

            // dynamic segment match e.g. /posts/{postId}
            const paramNames = [];
            const regexPath = route.path.replace(/{([^}]+)}/g, (_full, name) => {
                paramNames.push(name);
                return "([^/]+)";
            });
            const regex = new RegExp(`^${regexPath}$`);
            const match = path.match(regex);
            if (match){
                const params = {};
                paramNames.forEach((name, idx) => {
                    params[name] = match[idx + 1];
                });
                return { page: route.page, params };
            }
        }

        return null;
    }
}
