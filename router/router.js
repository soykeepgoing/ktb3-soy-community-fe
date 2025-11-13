import { LoginPage } from "../pages/LoginPage.js";
import { PostsCreate } from "../components/posts/PostsCreate.js";
import { PostEdit } from "../components/posts/PostEdit.js";
import { SignUpPage } from "../pages/SignUpPage.js";
import {EditProfilePage} from "../pages/EditProfilePage.js";
import {EditPasswordPage} from "../pages/EditPasswordPage.js";
import { PostDetailPage } from "../pages/PostDetailPage.js";
import { PostListPage } from "../pages/PostListPage.js";

const app = document.getElementById("app");

const routes = {
  "/": [LoginPage],
  "/signup": [SignUpPage],
  "/posts": [PostListPage],
  "/posts/create": [PostsCreate],
  "/posts/:param1": [PostDetailPage],
  "/posts/:param1/edit": [PostEdit],
  "/edit-profile": [EditProfilePage],
  "/edit-password": [EditPasswordPage]
};

function toParamPath(path) {
  if (path === "/") return { pattern: "/", params: [] };
  let letters = path.split("/");
  let paramNum = 1;
  const params = [];

  for (let i = 0; i < letters.length; i ++){
    const letter = letters[i];
    if (/^\d+$/.test(letter)){
      params.push(letter);
      letters[i] = `:param${paramNum}`;
      paramNum++;
    }
  }
  const pattern = letters.join("/");
  return {pattern, params};
}


export function router(){
  const path = window.location.pathname;
  const {pattern, params} = toParamPath(path);
  console.log(pattern, params);

  /*
    routes 맵을 순회하면서 패턴이 일치하는 컴포넌트를 확인 
    파라미터를 포함하는 경우 (":") 앞부분을 띄어서 일치하는지 확인했음 
  */
  const matched = Object.keys(routes).find( 
    route => {return route === pattern;
  }); 

  app.innerHTML = ""; // 화면 지우기 

  if (!matched){ // 라우팅할 수 없는 경우 
    app.innerHTML = "<h2>404 NotFound</h2>";
    return;
  }

  const components = routes[matched];

  /*
   보여줄 컴포넌트들 하나씩 순회하면서 파라미터 값 찾고 반환 
   app에 자식으로 추가해줌 
  */
  console.log(...params);
  components.forEach(component => {
    const elem = params.length > 0 ? 
      component(...params)
      : component();
    app.appendChild(elem);
  });
}

export function navigateTo(url){
  window.history.pushState(null, null, url);
  router();
}

window.addEventListener("popstate", router);

export function initRouter(){
  router("/"); 
  app.innerHTML = "";
  app.appendChild(LoginPage())
}