export function Dropdown({ placeholder, options }) {
    const div = document.createElement("div");
    div.classList.add("dropdown");

    div.innerHTML = `
        <button class="btn">${placeholder} ▾</button>
        <ul class="menu">
            ${options.map(o => `<li data-value="${o.value}">${o.label}</li>`).join("")}
        </ul>
    `;

    const btn = div.querySelector(".btn");
    const menu = div.querySelector(".menu");

    btn.addEventListener("click", () => {
        menu.classList.toggle("show");
    });

    div.querySelectorAll(".menu li").forEach(item => {
        item.addEventListener("click", () => {
            const value = item.dataset.value;

            btn.textContent = item.textContent + " ▾";
            menu.classList.remove("show");

            div.dispatchEvent(new CustomEvent("select", {
                detail: { value }
            }));
        });
    });

    return div;
}