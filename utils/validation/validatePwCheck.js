export function validatePwCheck(pwValue, value) {
    if (pwValue.trim() === "") {
        return {
            success: false, 
            helperText: "비밀번호를 입력하세요."};
    }

    if (pwValue !== value){
        return {success: false, helperText: "입력하신 비밀번호와 다릅니다."};
    }

    return {success: true, helperText: ""};
}
