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
        return true;
    } catch(error){
        console.log("게시글 등록 실패 : " + error);
        return false;
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

  try{
    const response = await fetch(getPostDetailUrl);
    if (!response.ok) console.log("게시글 상세 조회 실패");
    return await response.json();
  } catch{
    console.error("게시글 상세 조회 실패", err);
  }
}