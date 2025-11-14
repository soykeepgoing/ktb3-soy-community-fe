export function showToast(div, msg){
    div.textContent = msg;
    div.classList.add("show");

    setTimeout(()=> {
        div.classList.remove("show");
    }, 2500)
}