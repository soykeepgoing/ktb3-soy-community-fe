const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");

function renderPosts(posts){
    const postList = document.getElementById("post-list");
    posts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");
        postCard.innerHTML = `
        <h3>${post.title}</h3>
        <div class="meta">
            <span>좋아요 ${post.statsLikeCounts} 댓글 ${post.statsCommentCounts} 조회수 ${post.statsViewCounts}</span>
            <span>${post.createdAt}</span>
        </div>
        <div class="author">
            <span>${post.userNickname}</span>
        </div>
        `;
        postList.appendChild(postCard);
    });
}


fetch(`http://localhost:8080/api/posts?page=2&size=2`)
  .then(response => response.json())
  .then(data => {
    console.log(data.postItemResponseList);
    renderPosts(data.postItemResponseList);
  })
.catch(err => console.error(err));
