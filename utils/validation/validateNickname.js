export function validateNickname(value) {
    if (value.trim() === "") {
        return {
            success: false, 
            helperText: "닉네임을 입력하세요."};
    }

    if (/\s/.test(value)){
        return {
            success: false, 
            helperText: "닉네임에 공백이 있습니다."};
    }

    if (value.length >= 11){
        return {
            success: false, 
            helperText: "닉네임은 최대 10자까지 작성 가능합니다."
        }
    }

    return {success: true, helperText: ""};
}
