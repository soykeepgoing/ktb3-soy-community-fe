function changePreview(newImageUrl){
  const imagePreview = document.getElementById("userProfileImgPreview");
  imagePreview.src = newImageUrl;
}

function convertFileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const imageInput = document.getElementById("userProfileImg");
imageInput.addEventListener("change", handleProfileImageChange);

async function handleProfileImageChange(event) {
  const file = event.target.files[0];
  const userId = localStorage.getItem("userId");

  const formData = new FormData();
  formData.append("userProfileImg", file);

  const imageUrl = await convertFileToDataURL(file);

  changePreview(imageUrl);
  };