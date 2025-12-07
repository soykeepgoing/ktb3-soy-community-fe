export function validateEmail(value) {
    if (value.trim() === "") {
        return {success: false, helperText: "이메일을 입력하세요."};
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(value)){
        return {success: false, helperText: "이메일 형식을 확인해주세요."};
    }

    return {success: true, helperText: ""};
}
