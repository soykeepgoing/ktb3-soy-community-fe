class Renderer{
    constructor(){
        this.oldVNode = null;
        this.domPage = null;
        this.container = null;
    }

    mount(domPage, container){
        this.domPage = domPage;
        this.container = container;
        this.render();
    }

    render() {
        const newDom = this.domPage;
        if(this.oldVNode === null){
            this.container.appendChild(newDom());
            return
        }
        this.container.innerHTML = "";
        this.container.appendChild(newVDom);
    }

}

export const renderer = new Renderer();
export const mount = renderer.mount.bind(renderer);
export const render = renderer.render.bind(renderer);