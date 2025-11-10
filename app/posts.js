const src_default_user_profile = "../images/default_user_profile.png";
const getPostsURL = "http://localhost:8080/api/posts?";
const default_size = 20;
let currentPage = 0;
let noMorePage = false;
let postList = document.getElementById('post-list');

function fromCreatedAt(createdAt){
  return createdAt.replace("T", " ")
}

function getTitle(title){
  return title.substr(0, 27);
}

function getCount(count){
  if (count >= 100000) return "100K";
  else if(count >= 10000) return "10K";
  else if(count >= 1000) return "1K";
  else return count;
}

function renderPosts(posts){
    posts.forEach(post => {
        const title = getTitle(post.title);
        const likeCount = getCount(post.statsLikeCounts);
        const commentCount = getCount(post.statsCommentCounts);
        const viewCount = getCount(post.statsViewCounts);

        const postCard = document.createElement("div");
        postCard.classList.add("post-card");
        postCard.innerHTML = `
        <h3>${title}</h3>
        <div class="post-meta">
          <p>좋아요 ${likeCount} 댓글 ${commentCount} 조회수 ${viewCount}</p>
          <p>${fromCreatedAt(post.createdAt)}</p>
        </div>
        <hr/>
        <div class="author">
          <img class="profile-img" id="profile-img" src=${post.userProfileImgUrl}
          onerror="this.onerror=null; this.src='${src_default_user_profile}';"
          />
          <span>${post.userNickname}</span>
        </div>
        `;
        postList.appendChild(postCard);
    });
}



function fetchPosts(){
  fetch(getPostsURL + `page=${currentPage}&size=${default_size}`).then(
    response => response.json()
  ).then(
    data => {
      renderPosts(data.postItemResponseList);
      if (data.pagingMeta.pageSize === 0){
        noMorePage = true;
      }
    }
  ).catch(
    err => console.error("게시글 목록 조회 실패", err));
  currentPage++;
}

fetchPosts();


window.addEventListener('scroll', () => {
  if (noMorePage) return;

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    fetchPosts();
  }

  const writeBtn = document.querySelector(".button");
  const floatBtn = document.querySelector(".float-button");

  const rect = writeBtn.getBoundingClientRect();
  
  if (rect.bottom < 0) {
    floatBtn.classList.add("show");
  } else {
    floatBtn.classList.remove("show");
  }
});

