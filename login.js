const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const loginBtn = document.getElementById("btn-login");
const url = "http://localhost:8080/api/users/auth";

function signIn(){
  // event.preventDefault();
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
      if (!response.ok) {
        throw new Error('네트워크 응답이 정상적이지 않습니다');
      }
      return response.json(); 
    })
    .then(data => {
      console.log('응답:', data);
    })
    .catch(error => {
      console.error('fetch 작업 중 문제가 발생했습니다:', error);
    });
}

loginBtn.addEventListener("click", signIn);