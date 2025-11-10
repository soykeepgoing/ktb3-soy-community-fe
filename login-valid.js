const helperText = document.getElementById("helperText");

userEmail.addEventListener("input", () => {
    const value = userEmail.value.trim();

    if (value === "") {
        helperText.textContent = "이메일을 입력해주세요.";
        helperText.className = "helper-text show"; 
    } 
    else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) {
        helperText.textContent = "올바른 이메일 형식이 아닙니다.";
        helperText.className = "helper-text error show"; 
    } else{
        helperText.className = "helper-text";
    }
});

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

userPassword.addEventListener("input", () => {
  const value = userPassword.value.trim();

  if (value === "") {
    helperText.textContent = "비밀번호를 입력해주세요.";
    helperText.className = "helper-text show";
  } 
  else if (!passwordRegex.test(value)) {
    helperText.textContent =
      "비밀번호는 8자 이상, 20자 이하이며 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.";
    helperText.className = "helper-text show";
  } 
  else {
    helperText.className = "helper-text";
  }
});