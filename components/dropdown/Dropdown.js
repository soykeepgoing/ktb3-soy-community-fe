import { h } from "../../core/vdom/h.js";

export function Dropdown({className, placeholder, options, clickEvents = {}}){

    const handleToggle = (e) => {
        const btn = e.currentTarget;
        const menu = btn.nextElementSibling;
        menu.classList.toggle("show");
    }

    const handleClick = (e, option) => {
        const li = e.currentTarget; 
        const menu = li.parentElement;
        const btn = menu.previousElementSibling; 

        btn.textContent = li.textContent + " ▾";
        btn.classList.add("selected"); 
        menu.classList.remove("show");

        if (clickEvents[option.value]){
            clickEvents[option.value]();
        }
    }

    return h("div", {className},
        h("button", {
            className: "button", 
            onClick: handleToggle}, 
            `${placeholder}`),
        h("ul", 
            {className: "menu"}, 
            ...options.map(option => 
                h("li", 
                {"data-value": option.value,
                    onClick: (e) => { handleClick(e, option); }
                }, option.label)
            )
        )
    )
}