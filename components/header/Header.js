export function Header() {
    const header = document.createElement("header");
    header.classList.add("header");
    header.id = "header";

    header.innerHTML = `
    <h1 class="header__title">Dancing Tomato Club</h1>
    <div class="header__profile" id="header__profile">
        <div class="header__dropdown">
            🍅
        </div>
    </div>
    `;

    return header;
}
