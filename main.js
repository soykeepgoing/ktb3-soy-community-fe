import { Router } from "./core/router.js"
import { LoginPage } from "./pages/LoginPage/LoginPage.js";
import { createElement } from "./core/vdom/createElement.js";
import {render} from "./core/render/render.js";
import {workLoop} from "./core/fiber/scheduler.js";

const router = new Router();
const container = document.getElementById("root");

router
    .add("/index.html", LoginPage)
    .add("/", LoginPage);

router.start((PageComponent) => {
    const appElement = createElement(
        PageComponent,
        null
    );
    render(appElement, container);
});

requestIdleCallback(workLoop);