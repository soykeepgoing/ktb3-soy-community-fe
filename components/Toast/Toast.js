import { useEffect } from "../../core/hooks/useEffect.js";
import { h } from "../../core/vdom/h.js";

export function Toast({isToastOn, setIsToastOn, text}){
    useEffect(() => {
        if (!isToastOn) return;

        const timer = setTimeout(() => {
            setIsToastOn(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [isToastOn]);

    const classNames = ["toast"];
    if (isToastOn) classNames.push("show");

    return h(
        "div", 
        {className: classNames}, 
        text
    );
}
