import { LoginPage } from "../pages/LoginPage.js";
import { SignUpPage } from "../pages/SignUpPage.js";
import {EditProfilePage} from "../pages/EditProfilePage.js";
import {EditPasswordPage} from "../pages/EditPasswordPage.js";
import { PostDetailPage } from "../pages/PostDetailPage.js";
import { PostListPage } from "../pages/PostListPage.js";
import { PostCreatePage } from "../pages/PostCreatePage.js";
import {PostEditPage} from "../pages/PostEditPage.js";
import {mount} from "../core/renderer.js";

class Router{
    constructor(){
        this.appContainer = document.getElementById("app");
        this.pathPageMap = {
            "/": LoginPage,
            "/signup": SignUpPage, 
            "/posts": PostListPage,
            "/posts/create": PostCreatePage,
            "/posts/:param1": PostDetailPage,
            "/posts/:param1/edit": PostEditPage,
            "/edit-profile": EditProfilePage,
            "/edit-password": EditPasswordPage
        };
    }

    toParamPath(path) {
        if (path === "/") return { pattern: "/", params: [] };
        let letters = path.split("/");
        let paramNum = 1;
        const params = [];

        for (let i = 0; i < letters.length; i ++){
            const letter = letters[i];
            if (/^\d+$/.test(letter)){
                params.push(letter);
                letters[i] = `:param${paramNum}`;
            paramNum++;}
        }
        const pattern = letters.join("/");
        return {pattern, params};
    }

    navigateTo(url){
        window.history.pushState(null, null, url); 
        const path = window.location.pathname;
        const {pattern, params} = this.toParamPath(path);
        console.log(pattern, params);

        const matchedPage = Object.keys(this.pathPageMap).find( 
            route => {return route === pattern;
        }); 

        const page = this.pathPageMap[matchedPage];
        mount(page, this.appContainer);
    }
}

export const router = new Router();
export const navigateTo = router.navigateTo.bind(router);
