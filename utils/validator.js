export const isValidEmail = (email) => {
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    if (email === "") return false;
    if (!emailRegex.test(email)) return false;
    return true;
}

export const isValidPw = (pw) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
    if (pw === "") return false;
    if (!passwordRegex.test(value)) return false;
    return true;
}