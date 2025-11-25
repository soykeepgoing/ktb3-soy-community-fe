class Renderer{
    constructor(){
        this.currentPage = null;
        this.container = document.getElementById("app");
    }

    h(type, props = {}, ...children) {
        return {type, props, children};
    }

    isEventProp(property){
        return property.slice(0, 2) === "on";
    }

    createDom(node) {
        const dom = document.createElement(node.type);
        // console.log(node, dom);
        for (const [key, value] of Object.entries(node.props) ){
            if (this.isEventProp(key)){
                const event = key.slice(2).toLowerCase();
                dom.addEventListener(event, value);
            } else if (key === "class") {
                const classes = Array.isArray(value) ? value
                : typeof value === "string"
                ? value.trim().split(/\s+/)
                : [];
                classes.forEach(cls => dom.classList.add(cls));
            } else {
                console.log(key, value);
                dom.setAttribute(key, value);
            }
        }

        for (const childNode of node.children){
            if (typeof childNode === "string"){
                const childDom = document.createTextNode(childNode);
                dom.appendChild(childDom);
            } else {
                const childDom = this.createDom(childNode);
                dom.appendChild(childDom);
            }
        }
        return dom;
    } 


    mount(newPage) {
        if (this.currentPage) {
            this.container.innerHTML = "";
            
            // unmount 로직 추가 
        }
        this.currentPage = newPage;
        render();
    }

    render() {
        this.container.appendChild(this.currentPage);
    }

}

export const renderer = new Renderer();
export const mount = renderer.mount.bind(renderer);
export const render = renderer.render.bind(renderer);
export const h = renderer.h.bind(renderer);
export const createDom = renderer.createDom.bind(renderer);