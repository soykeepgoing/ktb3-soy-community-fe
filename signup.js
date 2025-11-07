function isNotValidPassword(userPassword, userPasswordCheck){
    return userPassword == userPasswordCheck;
}


function getSignUpData(){
   const userEmail = document.getElementById("userEmail").value;
   const userPassword = document.getElementById("userPassword").value;
   const userPasswordCheck = document.getElementById("userPasswordCheck").value;

   if(!isNotValidPassword(userPassword, userPasswordCheck)){
    return null;
   }

   const userNickname = document.getElementById("userNickname").value;
   
   return {
    userEmail, 
    userPassword, 
    userNickname
   };
}

function fetchData(url, options){

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

function postServer(data){
    event.preventDefault();
    const url = "http://localhost:8080/api/users";
    const jsonData = JSON.stringify(data);

    console.log(jsonData); 

    const options = { method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: jsonData
    };
    fetchData(url, options);
}


function signup(){
    const signUpData = getSignUpData();
    console.log(signUpData);
    if(!signUpData) return;
    postServer(signUpData);
}

const signUpBtn = document.getElementById("btn-signup");
signUpBtn.addEventListener('click', signup);