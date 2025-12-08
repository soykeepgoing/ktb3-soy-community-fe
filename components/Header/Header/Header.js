import { h } from "../../../core/vdom/h.js";
import { HeaderTitle } from "../HeaderTitle/HeaderTitle.js";
import { HeaderDropDown } from "../HeaderDropdown/HeaderDropdown.js";

export function Header(){
    return h("div", {className: "header"}, 
        HeaderTitle(), 
        HeaderDropDown()
    );
}

// import {HeaderDropdown} from "../HeaderDropdown.js"

// export function Header() {
    
//     const header = document.createElement("header");
//     header.classList.add("header");
//     header.id = "header";

//     header.appendChild(HeaderTitle());
//     header.appendChild(HeaderDropdown());

//     return header;
// }

// function HeaderTitle(){
//     const title = document.createElement("h1");
//     title.classList.add("title");
//     title.innerHTML = "Dancing Tomato Club";
//     return title;
// }