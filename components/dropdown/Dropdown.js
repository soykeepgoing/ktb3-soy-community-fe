import { h } from "../../core/vdom/h.js";

export function Dropdown({className, placeholder, showMenu = true, options, clickEvents = {}}){

    const handleToggle = (e) => {
        const btn = e.currentTarget;
        const menu = btn.nextElementSibling;
        menu.classList.toggle("show");
    }

    const handleClick = (e, option) => {
        const li = e.currentTarget; 
        const menu = li.parentElement;
        const btn = menu.previousElementSibling; 
        if (showMenu) {
            btn.textContent = li.textContent + " ▾";
        }
        menu.classList.remove("show");

        if (clickEvents[option.value]){
            clickEvents[option.value]();
        }
    }

    return h("div", {className},
        h("button", { 
            onClick: handleToggle}, 
            `${placeholder}`),
        h("ul", {},
            ...options.map(option => 
                h("li", 
                {"data-value": option.value,
                    onClick: (e) => { handleClick(e, option); }
                }, option.label)
            )
        )
    )
}