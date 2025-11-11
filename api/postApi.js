export async function createPost(postData, userId){
    try{
        const response = await fetch(`http://localhost:8080/api/posts?userId=${userId}`, {
                method: "POST", 
                headers: {
                  "Header": "application/json",
                  "Content-Type": "application/json"},
                body: JSON.stringify(postData)
            });
        
        if (!response.ok) alert("게시글 등록 실패");
        const data = await response.json();
        return {state: true, postId: data.postId};
    } catch(error){
        console.log("게시글 등록 실패 : " + error);
        return {state: false, postId: undefined};
    }
}

export async function getPosts(currentPage, pageSize){
  const getPostsURL = "http://localhost:8080/api/posts?";
  const url = getPostsURL + `page=${currentPage}&size=${pageSize}`;

  try{
    const response = await fetch(url);
    if (!response.ok) console.log("게시글 목록 조회 실패");
    return await response.json();
  } catch{
    console.error("게시글 목록 조회 실패", err);
  }
}

export async function getPostDetail(postId){
  const getPostDetailUrl = `http://localhost:8080/api/posts/${postId}`;
  console.log(getPostDetailUrl);
  try{
    const response = await fetch(getPostDetailUrl);
    if (!response.ok) console.log("게시글 상세 조회 실패");
    return await response.json();
  } catch{
    console.error("게시글 상세 조회 실패", err);
  }
}

export async function editPost(postData, postId, userId){
  const editPostUrl = `http://localhost:8080/api/posts/${postId}?userId=${userId}`;
  console.log(editPostUrl);

  try{
      const response = await fetch(editPostUrl, {
                method: "PATCH", 
                headers: {
                  "Header": "application/json",
                  "Content-Type": "application/json"},
                body: JSON.stringify(postData)});

      if (!response.ok) alert("게시글 수정 실패");
  
      const data = await response.json();
      return true;
  } catch(error) {
    console.log("게시글 수정 에러" + error);
    return false
  }
}

export async function deletePost(postId, userId){
  const deletePostUrl =  `http://localhost:8080/api/posts/${postId}?userId=${userId}`;
  try{
      const response = await fetch(deletePostUrl, {method: "DELETE"});
      if (!response.ok) alert("게시글 삭제 실패");
      return true;
  } catch(error) {
    console.log("게시글 삭제 에러" + error);
    return false
  }
}

export async function uploadImageFile(postId, file){
  const formData = new FormData();
  formData.append("file", file);

  fetch(`http://localhost:8080/api/posts/${postId}/profile`, {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("이미지 업로드 실패");
      return res.json();
    })
    .then(data => {
      console.log("이미지 업데이트 완료:", data);
      localStorage.setItem("userProfileImg", data.profileImgUrl);
    })
    .catch(err => console.error(err));
}