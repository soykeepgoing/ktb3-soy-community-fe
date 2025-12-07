export function validatePw(value) {
    if (value.trim() === "") {
        return {
            success: false, 
            helperText: "비밀번호를 입력하세요."};
    }

    const pwReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
    if (!pwReg.test(value)) {
        return {
            success: false, 
            helperText: "비밀번호는 8자 이상, 20자 이하이며 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
        };
    }

    return {success: true, helperText: ""};
}
