import {Login} from "../components/Login.js";
import {Posts} from "../components/posts/Posts.js";
import { PostsCreate } from "../components/posts/PostsCreate.js";
import {PostDetail} from "../components/posts/PostDetail.js";
import { CommentsSection } from "../components/comments/CommentsSection.js";

const app = document.getElementById("app");

const routes = {
  "/": [Login],
  "/posts": [Posts],
  "/posts/create": [PostsCreate],
  "/posts/:id": [PostDetail, CommentsSection]
};

export function router(){
  const path = window.location.pathname;

  /*
    routes 맵을 순회하면서 패턴이 일치하는 컴포넌트를 확인 
    파라미터를 포함하는 경우 (":") 앞부분을 띄어서 일치하는지 확인했음 
  */
  const matched = Object.keys(routes).find( 
    route => {
      if (route.includes(":")){
        const base = route.split("/:")[0]
        return path.startsWith(base);
      }
      return route === path;
    }); 

  app.innerHTML = ""; // 화면 지우기 

  if (!matched){ // 라우팅할 수 없는 경우 
    app.innerHTML = "<h2>404 NotFound</h2>";
    return;
  }

  const components = routes[matched];
  const param = path.split("/").pop();

  /*
   보여줄 컴포넌트들 하나씩 순회하면서 파라미터 값 찾고 반환 
   app에 자식으로 추가해줌 
  */

  components.forEach(component => {
    const elem = matched.includes(":") ? component(param) : component();
    app.appendChild(elem);
  });
}

export function navigateTo(url){
  window.history.pushState(null, null, url);
  router();
}

window.addEventListener("popstate", router);

export function initRouter(){
  navigateTo("/");
}