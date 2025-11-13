export function PostList(){
    const section = document.createElement("section");
    section.className = "posts";
    section.innerHTML = `
        <div class="post-header">
            <p>
                안녕하세요.<br>
                아무말 대잔치 <strong>게시판</strong>입니다.
            </p>
            <button class="button" id="post-create-btn">게시글 작성</button>
        </div>

        <div id="post-list"></div>
    `;
    return section;
}
