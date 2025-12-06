import { globalFiberState } from "./fiber/globalFiberState.js";

export class Router{
    constructor(){
        this.routes = {},
        this.container = document.getElementById("root");
        this.currentPath = window.location.pathname;
        this._onChanged = null; 
        window.addEventListener("popstate", this._handlePopState.bind(this));
    }

    add(param, page){
        this.routes[param] = page;
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
        const page = this.routes[path] || this.routes['*'];

        if(this._onChanged){
            this._onChanged(page)
        }
    }

    _handlePopState(){
        this.currentPath = window.location.pathname;
        this._render();
    }
}