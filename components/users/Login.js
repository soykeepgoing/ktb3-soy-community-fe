export function Login() {
    const section = document.createElement("section");

    section.innerHTML = `
        <div class="login__title" id="login__title">Dancing Tomato Club</div>


        <div class="login__field" id="login__user-email">
            <label>Email</label>
            <input 
                type="email" 
                id="login__user-email-input"
                placeholder="email"
            />
        </div>

        <div class="login__field" id="login__user-password">
            <label>Password</label>
            <input 
                type="password" 
                id="login__user-password-input"
                placeholder="password"
            />
        </div>

        <p class="helper-text" id="login__helper-text"></p>

        <button 
            class="login__btn" 
            id="login__btn" 
            disabled
        >Sign in</button>
    `;

    return section;
}
