import { Router } from "./core/router.js"
import { createElement } from "./core/vdom/createElement.js";
import {render} from "./core/render/render.js";
import {workLoop} from "./core/fiber/scheduler.js";

import { LoginPage } from "./pages/LoginPage/LoginPage.js";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage.js";
import { PostFeedPage } from "./pages/PostFeedPage/PostFeedPage.js";
import { PostCreatePage } from "./pages/PostCreatePage/PostCreatePage.js";
import { EditProfilePage } from "./pages/EditProfilePage/EditProfilePage.js";
import { EditPasswordPage } from "./pages/EditPasswordPage/EditPasswordPage.js";
import { PostDetailPage } from "./pages/PostDetailPage/PostDetailPage.js";

export const router = new Router();

router
    .add("/index.html", LoginPage)
    .add("/", LoginPage)
    .add("/signup", SignUpPage)
    .add("/posts", PostFeedPage)
    .add("/posts/create", PostCreatePage)
    .add("/posts/{postId}", PostDetailPage)
    .add("/edit/profile", EditProfilePage)
    .add("/edit/password", EditPasswordPage);

router.start((PageComponent, params) => {
    const appElement = createElement(
        PageComponent,
        { params }
    );
    render(appElement, router.container);
});

requestIdleCallback(workLoop);
