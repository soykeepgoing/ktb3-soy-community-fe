const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const loginBtn = document.getElementById("btn-login");
const url = "http://localhost:8080/api/users/auth";

function getUserData(){
  const inputValue = {
    "userEmail": userEmail.value,
    "userPassword": userPassword.value
  }

  const jsonData = JSON.stringify(inputValue);
  const userData = { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: jsonData
  };

  return userData;
}

function convertHelperTextToWarning(){
  helperText.textContent = "아이디 또는 비밀번호를 확인해주세요.";
  helperText.className = "helper-text show";
}

function signIn(){
  event.preventDefault();
  const userData = getUserData();

  fetch(url, userData)
    .then(response => {
      if (!response.ok) {
        convertHelperTextToWarning();
        throw new Error("로그인 실패");
      }
      return response.json();
    }).then(
      data => {
        console.log(data);  
        localStorage.setItem("userId", data.data.userId);
        window.location.href = `posts.html?userId=${localStorage.getItem("userId")}`;
      }
    ).catch(err => console.error("로그인 실패:", err));
}

loginBtn.addEventListener("click", signIn);