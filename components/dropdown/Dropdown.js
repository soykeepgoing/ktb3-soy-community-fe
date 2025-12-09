import { h } from "../../core/vdom/h.js";

export function Dropdown({
    className,
    placeholder, 
    options,
    selectedValue,
    isOpen,
    onToggle,
    clickEvents = {}}){

    const selectedLabel = options.find(o => o.value === selectedValue)?.label || placeholder;

    return h(
        "div", 
        {className}, 
        h("button", {onClick: onToggle}, `${selectedLabel}`),

        isOpen?
            h(
                "ul", 
                {},
                ...options.map(option => 
                    h(
                        "li", 
                        {
                            "data-value": option.value, 
                            onClick: () => {
                                clickEvents[option.value]()
                            }
                        }, 
                        option.label
                    )
                )
            )
        : h()
    )

    }