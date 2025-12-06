import { Router } from "./core/router.js"
import { createElement } from "./core/vdom/createElement.js";
import {render} from "./core/render/render.js";
import {workLoop} from "./core/fiber/scheduler.js";

import { LoginPage } from "./pages/LoginPage/LoginPage.js";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage.js";

export const router = new Router();
const container = document.getElementById("root");

router
    .add("/index.html", LoginPage)
    .add("/", LoginPage)
    .add("/signup", SignUpPage)

router.start((PageComponent) => {
    const appElement = createElement(
        PageComponent,
        null
    );
    render(appElement, container);
});

requestIdleCallback(workLoop);