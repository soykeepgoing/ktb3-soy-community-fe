class Renderer{
    constructor(){
        this.currentPage = null;
        this.container = document.getElementById("app");
    }

    mount(newPage){
        if (this.currentPage) {
            this.container.removeChild(this.currentPage)
        };
        this.currentPage = newPage;
        this.render();
    }

    render() {
        this.container.appendChild(this.currentPage);
    }

}

export const renderer = new Renderer();
export const mount = renderer.mount.bind(renderer);
export const render = renderer.render.bind(renderer);