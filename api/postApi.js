export async function createPost(postData){
    try{
        const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(postData)
            });
        
        if (!response.ok) alert("게시글 등록 실패");

        const data = await response.json();

        console.log("서버 응답", data);
        return data;
    } catch(error){
        console.log("게시글 등록 실패 : " + error);
    }

}