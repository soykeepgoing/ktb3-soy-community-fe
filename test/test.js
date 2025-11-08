const userEmail = document.getElementById("userEmail");
const emailHelper = document.getElementById("emailHelper");

userEmail.addEventListener("input", () => {
  const value = userEmail.value.trim();

  if (value === "") {
    emailHelper.textContent = "이메일을 입력해주세요.";
    emailHelper.className = "helper-text show"; // 표시 + 기본색
  } 
  else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(value)) {
    emailHelper.textContent = "올바른 이메일 형식이 아닙니다.";
    emailHelper.className = "helper-text error show"; // 표시 + 빨간색
  } 
  else {
    emailHelper.textContent = "사용 가능한 이메일입니다.";
    emailHelper.className = "helper-text success show"; // 표시 + 초록색
  }
});
