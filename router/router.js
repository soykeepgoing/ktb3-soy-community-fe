import {Login} from "../components/Login.js";

const routes = {
    "/": Login
};

export function navigateTo(routeName){
    const app = document.getElementById("app");
    app.innerHTML = "";

    const component = routes[routeName];
    app.appendChild(component());
}

export function initRouter(){
    navigateTo("/");
}