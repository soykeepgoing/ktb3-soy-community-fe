export async function createComment(commentData, postId){
    const userId = localStorage.getItem("userId");
    const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments?userId=${userId}`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify(commentData)
    });

    console.log(response);

    if (!response.ok) {
        console.log("댓글 등록 실패");
        return {state: "fail"};
    }

    const data = await response.json();
    data.state = "success";
    return data;
}

export async function getComments(postId) {
  try {
    const response = await fetch(`http://localhost:8080/api/posts/${postId}/comments`);
    console.log(response);
    if (!response.ok) console.log("댓글 조회 실패");
    return await response.json();
  } catch (err) {
    console.error("댓글 조회 중 오류 발생:", err);
  }
}

export async function deleteComments(postId, commentId, userId){
  const deletePostUrl =  `http://localhost:8080/api/posts/${postId}/comments/${commentId}?userId=${userId}`;
  try{
      const response = await fetch(deletePostUrl, {method: "DELETE"});
      if (!response.ok) console.log("댓글 삭제 실패");
      return true;
  } catch(error) {
    console.log("댓글 삭제 에러" + error);
    return false
  }
}

export async function editComment(commentData, postId, commentId){
  const userId = localStorage.getItem("userId");
  const editCommentUrl = `http://localhost:8080/api/posts/${postId}/comments/${commentId}?userId=${userId}`;
  console.log(editCommentUrl);

  try{
    const response = await fetch(editCommentUrl, {
      method: "PATCH", 
      headers: {
        "Header": "application/json",
        "Content-Type": "application/json"},
        body: JSON.stringify(commentData)});

    if (!response.ok) alert("댓글 수정 실패");
    const data = await response.json();
    return true;
  } catch(error) {
    console.log("댓글 수정 에러" + error);
    return false
  }
}