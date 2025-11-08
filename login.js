const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const loginBtn = document.getElementById("btn-login");
const url = "http://localhost:8080/api/users/auth";

function signIn(){
  event.preventDefault();
  const userData = {
    "userEmail": userEmail.value,
    "userPassword": userPassword.value
  }

  const jsonData = JSON.stringify(userData);
  const options = { method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: jsonData
  };

  fetch(url, options)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        helperText.textContent = "아이디 또는 비밀번호를 확인해주세요.";
        helperText.className = "helper-text show";
      }
      return response.json(); 
    })
    .then(data => {
      console.log('응답:', data);
      window.location.href = "http://127.0.0.1:5500/pages/posts.html?";
    });
}

loginBtn.addEventListener("click", signIn);